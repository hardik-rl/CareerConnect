import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const getMyApplications = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: req.user!.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load applications",
    });
  }
};




export const applyForJob = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: "This job is no longer active",
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: req.user!.userId,
          jobId,
        },
      },
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await prisma.application.create({
      data: {
        userId: req.user!.userId,
        jobId,
        coverLetter: coverLetter?.trim() || null,
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Apply for job error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit application",
    });
  }
};