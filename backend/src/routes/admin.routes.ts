
import { Router } from "express";

import {
  getAdminDashboard,
  getAdminUsers,
  getAdminCompanies,
  getAdminJobs,
  getAdminApplications,
} from "../controllers/admin.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

// All Admin routes require a valid ADMIN login
router.use(authenticate, authorize("ADMIN"));

// Dashboard statistics
router.get("/dashboard", getAdminDashboard);

// Users management - list
router.get("/users", getAdminUsers);

// Companies management - list
router.get("/companies", getAdminCompanies);

// Jobs management - list
router.get("/jobs", getAdminJobs);

// Applications management - list
router.get("/applications", getAdminApplications);

export default router;
