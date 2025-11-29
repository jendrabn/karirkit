import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import { AuthController } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import {
  loginRateLimiter,
  passwordResetRateLimiter,
} from "../middleware/rate-limit.middleware";
import { ApplicationController } from "../controllers/application.controller";

const router = Router();

router.get("/health", getHealth);

// Auth API
router.post("/auth/register", AuthController.register);
router.post("/auth/login", loginRateLimiter, AuthController.login);
router.post("/auth/google", AuthController.loginWithGoogle);
router.post(
  "/auth/forgot-password",
  passwordResetRateLimiter,
  AuthController.sendPasswordResetLink
);
router.post("/auth/reset-password", AuthController.resetPassword);
router.post("/auth/logout", authMiddleware, AuthController.logout);
router.get("/auth/me", authMiddleware, AuthController.me);
router.put("/auth/me", authMiddleware, AuthController.updateMe);
router.put(
  "/auth/change-password",
  authMiddleware,
  AuthController.changePassword
);

// Applications API
router.get("/applications", authMiddleware, ApplicationController.list);
router.post("/applications", authMiddleware, ApplicationController.create);
router.get("/applications/:id", authMiddleware, ApplicationController.get);
router.put("/applications/:id", authMiddleware, ApplicationController.update);
router.delete(
  "/applications/:id",
  authMiddleware,
  ApplicationController.delete
);
router.post(
  "/applications/:id/duplicate",
  authMiddleware,
  ApplicationController.duplicate
);

export default router;
