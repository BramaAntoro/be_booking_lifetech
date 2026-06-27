import { Router } from "express";
import { loginController, logoutController, registerController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), registerController);
authRoutes.post("/login", validate(loginSchema), loginController);
authRoutes.post("/logout", requireAuth, logoutController);

export default authRoutes;