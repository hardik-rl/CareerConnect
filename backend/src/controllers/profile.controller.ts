import type { Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const profileInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  headline: z.string().trim().max(160),
  bio: z.string().trim().max(3000),
  skills: z.array(z.string().trim().min(1).max(60)).max(40),
  experience: z.number().int().nonnegative().nullable(),
  location: z.string().trim().max(160),
  resumeUrl: z.union([z.string().url(), z.literal("")]),
  linkedinUrl: z.union([z.string().url(), z.literal("")]),
  githubUrl: z.union([z.string().url(), z.literal("")]),
});

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            headline: true,
            bio: true,
            skills: true,
            experience: true,
            location: true,
            resumeUrl: true,
            linkedinUrl: true,
            githubUrl: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Get job seeker profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load profile",
    });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  const parsed = profileInput.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the profile details and try again",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, ...profile } = parsed.data;

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const user = await transaction.user.update({
        where: { id: req.user!.userId },
        data: { name, email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      const savedProfile = await transaction.profile.upsert({
        where: { userId: req.user!.userId },
        create: {
          ...profile,
          userId: req.user!.userId,
        },
        update: profile,
        select: {
          headline: true,
          bio: true,
          skills: true,
          experience: true,
          location: true,
          resumeUrl: true,
          linkedinUrl: true,
          githubUrl: true,
        },
      });

      return { user, profile: savedProfile };
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "That email address is already in use",
      });
    }

    console.error("Update job seeker profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to save profile",
    });
  }
};
