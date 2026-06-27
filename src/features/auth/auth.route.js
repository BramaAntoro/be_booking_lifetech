import { Router } from "express";
import { registerController } from "./auth.controller.js";
import { registerSchema } from "./auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), registerController);

export default authRoutes;