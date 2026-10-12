import type { Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const companySchema = z.object({
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(3000).nullable().optional(),
  website: z.union([z.string().url(), z.literal("")]).optional(),
  location: z.string().trim().max(160).optional(),
  logo: z.union([z.string().url(), z.literal("")]).optional(),
});

export const createMyCompany = async (
  req: AuthRequest,
  res: Response,
) => {
  const parsed = companySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the company details",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const company = await prisma.company.upsert({
      where: {
        userId: req.user!.userId,
      },
      create: {
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        website: parsed.data.website || null,
        location: parsed.data.location || null,
        logo: parsed.data.logo || null,
        userId: req.user!.userId,
      },
      update: {
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        website: parsed.data.website || null,
        location: parsed.data.location || null,
        logo: parsed.data.logo || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Company profile saved successfully",
      data: company,
    });
  } catch (error) {
    console.error("Create company profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save company profile",
    });
  }
};