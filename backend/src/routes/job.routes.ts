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


import { Router } from "express";
import { getJobs, getJobById } from "../controllers/job.controller.js";

const router = Router();

// Public APIs
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;