// import { Router } from "express";
// import { createJob } from "../controllers/job.controller.js";
// import {
//   authenticate,
//   authorize,
// } from "../middleware/auth.middleware.js";

// const router = Router();

// router.post(
//   "/",
//   authenticate,
//   authorize("EMPLOYER"),
//   createJob,
// );

// export default router;


// import { Router } from "express";
// import { getJobs, getJobById } from "../controllers/job.controller.js";

// const router = Router();

// // Public APIs
// router.get("/", getJobs);
// router.get("/:id", getJobById);

// export default router;

// import { Router } from "express";
// import { getJobs, getJobById, createJob, getEmployerDashboard } from "../controllers/job.controller.js";
// import { authenticate, authorize } from "../middleware/auth.middleware.js";

// const router = Router();

// // Public APIs
// router.get("/", getJobs);
// router.get("/:id", getJobById);

// // Employer API
// router.post(
//   "/employer/dashboard",
//   authenticate,
//   authorize("EMPLOYER"),
//   getEmployerDashboard,
//   createJob
// );

// export default router;


import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  getEmployerDashboard,
  updateJob,
  createJob,
} from "../controllers/job.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getJobs);

// Employer dashboard — keep before dynamic routes
router.get(
  "/employer/dashboard",
  authenticate,
  authorize("EMPLOYER"),
  getEmployerDashboard,
);

router.get("/:id", getJobById);

// Employer creates a job
router.post(
  "/",
  authenticate,
  authorize("EMPLOYER"),
  createJob,
);

router.put(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  updateJob,
);

export default router;