import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import { AuthController } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/health", getHealth);

// Auth API
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/google", AuthController.loginWithGoogle);
router.post("/auth/forgot-password", AuthController.sendPasswordResetLink);
router.post("/auth/reset-password", AuthController.resetPassword);
router.post("/auth/logout", authMiddleware, AuthController.logout);
router.get("/auth/me", authMiddleware, AuthController.me);
router.put("/auth/me", authMiddleware, AuthController.updateMe);
router.put(
  "/auth/change-password",
  authMiddleware,
  AuthController.changePassword
);

export default router;
