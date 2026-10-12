// import { Router } from "express";
// // import { getMyApplications } from "../controllers/application.controller.js";
// import {
//   authenticate,
//   authorize,
// } from "../middleware/auth.middleware.js";

// import {
//   getMyApplications,
//   applyForJob,
// } from "../controllers/application.controller.js";

// const router = Router();

// router.get(
//   "/me",
//   authenticate,
//   authorize("JOB_SEEKER"),
//   getMyApplications,
//   applyForJob
// );

// export default router;

import { Router } from "express";
import {
  getMyApplications,
  applyForJob,
} from "../controllers/application.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  authorize("JOB_SEEKER"),
  getMyApplications,
);

router.post(
  "/",
  authenticate,
  authorize("JOB_SEEKER"),
  applyForJob,
);

export default router;