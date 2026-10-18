import { Router } from "express";
import {
  applyForJob,
  getMyApplications,
  getAllApplicationsForAdmin,
  updateApplicationStatus,
  getEmployerApplications,
  updateEmployerApplicationStatus,
  getEmployerApplicationById
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
  getMyApplications,
  getEmployerApplications
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("EMPLOYER"),
  updateEmployerApplicationStatus,
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


router.get(
  "/employer",
  authenticate,
  authorize("EMPLOYER"),
  getEmployerApplications,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("EMPLOYER"),
  updateEmployerApplicationStatus,
);

router.get(
  "/employer/:id",
  authenticate,
  authorize("EMPLOYER"),
  getEmployerApplicationById,
);


export default router;

