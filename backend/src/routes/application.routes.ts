import { Router } from "express";
import {
  applyForJob,
  getMyApplications,
  getAllApplicationsForAdmin,
  updateApplicationStatus
} from "../controllers/application.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/applications",
  authenticate,
  authorize("JOB_SEEKER"),
  getMyApplications
);

router.post(
  "/apply",
  authenticate,
  authorize("JOB_SEEKER"),
  applyForJob
);


// Admin: View all applications
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  getAllApplicationsForAdmin
);

// Admin: Update application status
router.patch(
  "/admin/:id/status",
  authenticate,
  authorize("ADMIN"),
  updateApplicationStatus
);


export default router;
