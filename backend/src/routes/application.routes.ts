// import { Router } from "express";
// import {
//   applyForJob,
//   getMyApplications,
//   getAllApplicationsForAdmin,
//   updateApplicationStatus,
//   getEmployerApplications,
//   updateEmployerApplicationStatus,
//   getEmployerApplicationById
// } from "../controllers/application.controller.js";
// import {
//   authenticate,
//   authorize,
// } from "../middleware/auth.middleware.js";

// const router = Router();

// router.get("/me", authenticate, getMyApplications);

// router.get(
//   "/applications",
//   authenticate,
//   authorize("JOB_SEEKER"),
//   getMyApplications,
//   getEmployerApplications
// );

// router.patch(
//   "/:id/status",
//   authenticate,
//   authorize("EMPLOYER"),
//   updateEmployerApplicationStatus,
// );

// router.post(
//   "/apply",
//   authenticate,
//   authorize("JOB_SEEKER"),
//   applyForJob
// );

// router.post("/", authenticate, authorize("JOB_SEEKER"), applyForJob);

// // Admin: View all applications
// router.get(
//   "/admin",
//   authenticate,
//   authorize("ADMIN"),
//   getAllApplicationsForAdmin
// );

// // Admin: Update application status
// router.patch(
//   "/admin/:id/status",
//   authenticate,
//   authorize("ADMIN"),
//   updateApplicationStatus
// );


// router.get(
//   "/employer",
//   authenticate,
//   authorize("EMPLOYER"),
//   getEmployerApplications,
// );

// router.patch(
//   "/:id/status",
//   authenticate,
//   authorize("EMPLOYER"),
//   updateEmployerApplicationStatus,
// );

// router.get(
//   "/employer/:id",
//   authenticate,
//   authorize("EMPLOYER"),
//   getEmployerApplicationById,
// );


// export default router;




import { Router } from "express";

import {
  applyForJob,
  getMyApplications,
  getAllApplicationsForAdmin,
  updateApplicationStatus,
  getEmployerApplications,
  updateEmployerApplicationStatus,
  getEmployerApplicationById,
  getJobSeekerApplicationsById,
  getMyApplicationById,
} from "../controllers/application.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

// Job Seeker: Apply for a job
router.post(
  "/",
  authenticate,
  authorize("JOB_SEEKER"),
  applyForJob
);

// Job Seeker: My applications
router.get(
  "/me",
  authenticate,
  authorize("JOB_SEEKER"),
  getMyApplications
);

router.get(
  "/me/:id",
  authenticate,
  authorize("JOB_SEEKER"),
  getMyApplicationById
  // getJobSeekerApplicationsById
);
// router.get(
//   "/job-seeker/:id",
//   authenticate,
//   authorize("EMPLOYER", "ADMIN"),
//   getJobSeekerApplicationsById
// );

// Employer: View applications
router.get(
  "/employer",
  authenticate,
  authorize("EMPLOYER"),
  getEmployerApplications
);

// Employer: View application details
router.get(
  "/employer/:id",
  authenticate,
  authorize("EMPLOYER"),
  getEmployerApplicationById
);

// Employer: Update application status
router.patch(
  "/:id/status",
  authenticate,
  authorize("EMPLOYER"),
  updateEmployerApplicationStatus
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
