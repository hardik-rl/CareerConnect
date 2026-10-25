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



// Admin: Get all applications

export const getAllApplicationsForAdmin = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const applications = await prisma.application.findMany({
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
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get all applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load applications",
    });
  }
};


// Admin: Update application status

export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "PENDING",
      "REVIEWED",
      "SHORTLISTED",
      "REJECTED",
      "ACCEPTED",
    ] as const;

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(
        status as (typeof allowedStatuses)[number]
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
        allowedStatuses,
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: { id },
    });

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        status: status as (typeof allowedStatuses)[number],
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
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update application status",
    });
  }
};


export const getEmployerApplications = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const applications = await prisma.application.findMany({
      where: {
        job: {
          companyId: company.id,
        },
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
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Get employer applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
    });
  }
};

export const updateEmployerApplicationStatus = async (
  req: AuthRequest,
  res: Response,
) => {
  const allowedStatuses = [
    "PENDING",
    "REVIEWED",
    "SHORTLISTED",
    "REJECTED",
    "ACCEPTED",
  ] as const;

  const { status } = req.body as { status?: string };

  if (!status || !allowedStatuses.includes(status as (typeof allowedStatuses)[number])) {
    return res.status(400).json({
      success: false,
      message: "Invalid application status",
    });
  }

  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
      include: {
        job: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.job.companyId !== company.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update applications for your own jobs",
      });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: application.id },
      data: { status: status as (typeof allowedStatuses)[number] },
    });

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update application status",
    });
  }
};



export const getEmployerApplicationById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const applicationId = req.params.id;

    const company = await prisma.company.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: {
          companyId: company.id,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
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
        },
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found for your company",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get employer application details error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load candidate profile",
    });
  }
};


export const getJobSeekerApplicationsById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const applications = await prisma.application.findMany({
      where: {
        userId: id,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get job seeker applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job seeker applications",
    });
  }
};


// Job Seeker: Get single application details
export const getMyApplicationById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId, // Only the logged-in user's application
      },
      include: {
        job: {
          include: {
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

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get my application details error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load application details",
    });
  }
};