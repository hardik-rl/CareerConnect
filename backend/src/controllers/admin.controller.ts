
import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// Admin Dashboard
export const getAdminDashboard = async (
  _req: Request,
  res: Response,
) => {
  try {
    const startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
startDate.setUTCDate(startDate.getUTCDate() - 6);

const applicationDates = await prisma.application.findMany({
  where: {
    createdAt: {
      gte: startDate,
    },
  },
  select: {
    createdAt: true,
  },
});

const dailyCounts = new Map<string, number>();

for (let i = 0; i < 7; i++) {
  const date = new Date(startDate);
  date.setUTCDate(startDate.getUTCDate() + i);

  const key = date.toISOString().slice(0, 10);
  dailyCounts.set(key, 0);
}

for (const application of applicationDates) {
  const key = new Date(application.createdAt).toISOString().slice(0, 10);

  dailyCounts.set(key, (dailyCounts.get(key) ?? 0) + 1);
}

const applicationActivity = Array.from(dailyCounts.entries()).map(
  ([date, count]) => ({
    date,
    count,
  })
);
    const [
      totalUsers,
      totalJobSeekers,
      totalEmployers,
      totalCompanies,
      totalJobs,
      activeJobs,
      totalApplications,
      recentJobs,
      recentApplications,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: { role: "JOB_SEEKER" },
      }),

      prisma.user.count({
        where: { role: "EMPLOYER" },
      }),

      prisma.company.count(),

      prisma.job.count(),

      prisma.job.count({
        where: { isActive: true },
      }),

      prisma.application.count(),

      prisma.job.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          location: true,
          isActive: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          createdAt: true,
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
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalJobSeekers,
          totalEmployers,
          totalCompanies,
          totalJobs,
          activeJobs,
          inactiveJobs: totalJobs - activeJobs,
          totalApplications,
          
        },
        recentJobs,
        recentApplications,
        applicationActivity
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load admin dashboard",
    });
  }
};

// Admin: Get all users
export const getAdminUsers = async (
  _req: Request,
  res: Response,
) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Admin users error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

// Admin: Get all companies
export const getAdminCompanies = async (
  _req: Request,
  res: Response,
) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        website: true,
        location: true,
        createdAt: true,
        userId: true,
      },
    });

    return res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    console.error("Admin companies error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch companies",
    });
  }
};

// Admin: Get all jobs
export const getAdminJobs = async (
  _req: Request,
  res: Response,
) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
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
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Admin jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
};

// Admin: Get all applications
export const getAdminApplications = async (
  _req: Request,
  res: Response,
) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
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
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Admin applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
    });
  }
};
