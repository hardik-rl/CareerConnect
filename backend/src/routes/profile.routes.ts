import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profile.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, authorize("JOB_SEEKER"), getMyProfile);
router.put("/me", authenticate, authorize("JOB_SEEKER"), updateMyProfile);

export default router;
