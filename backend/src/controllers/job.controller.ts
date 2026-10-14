import type { Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const createJobInput = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(10000),
  requirements: z.array(z.string().trim().min(1).max(200)).max(50),
  location: z.string().trim().min(1).max(200),
  salaryMin: z.number().int().nonnegative().nullable(),
  salaryMax: z.number().int().nonnegative().nullable(),
  jobType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE",
  ]),
  experienceLevel: z.enum([
    "ENTRY",
    "JUNIOR",
    "MID",
    "SENIOR",
    "LEAD",
  ]),
});

export const createJob = async (

  req: AuthRequest,
  res: Response,
) => {
  const parsed = createJobInput.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the job details",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const company = await prisma.company.findUnique({
      where: {
        userId: req.user!.userId,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const job = await prisma.job.create({
      data: {
        ...parsed.data,
        companyId: company.id,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create job",
    });
  }
};

export const getJobs = async (_req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Get job by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job details",
    });
  }
};