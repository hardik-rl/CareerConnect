import { Router } from "express";
import { createMyCompany } from "../controllers/company.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/me",
  authenticate,
  authorize("EMPLOYER"),
  createMyCompany,
);

export default router;