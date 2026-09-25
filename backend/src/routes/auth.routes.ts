import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);


router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authenticated user",
    user: (req as typeof req & { user: unknown }).user,
  });
});


export default router;