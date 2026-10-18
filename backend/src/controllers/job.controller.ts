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


export const getEmployerDashboard = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        userId: req.user!.userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found. Please create your company profile first.",
      });
    }

    const jobs = await prisma.job.findMany({
      where: {
        companyId: company.id,
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
      },
    });

    const jobIds = jobs.map((job) => job.id);

    const applications = jobIds.length
      ? await prisma.application.findMany({
          where: {
            jobId: {
              in: jobIds,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            job: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        })
      : [];

    const countStatus = (status: string) =>
      applications.filter((application) => application.status === status).length;

    return res.status(200).json({
      success: true,
      data: {
        company,
        stats: {
          activeJobs: jobs.filter((job) => job.isActive).length,
          applications: applications.length,
          shortlisted: countStatus("SHORTLISTED"),
          accepted: countStatus("ACCEPTED"),
        },
        pipeline: {
          pending: countStatus("PENDING"),
          reviewed: countStatus("REVIEWED"),
          shortlisted: countStatus("SHORTLISTED"),
          accepted: countStatus("ACCEPTED"),
          rejected: countStatus("REJECTED"),
        },
        recentCandidates: applications.slice(0, 4).map((application) => ({
          id: application.id,
          name: application.user.name,
          email: application.user.email,
          role: application.job.title,
          status: application.status,
          appliedAt: application.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get employer dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load employer dashboard",
    });
  }
};


export const updateJob = async (
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
    // 1. Logged-in Employer ની company શોધો
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

    // 2. Job શોધો
    const existingJob = await prisma.job.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 3. Ownership check — બીજી company ની job edit નહીં થાય
    if (existingJob.companyId !== company.id) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own jobs",
      });
    }

    // 4. Job update કરો
    const updatedJob = await prisma.job.update({
      where: {
        id: existingJob.id,
      },
      data: parsed.data,
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update job",
    });
  }
};