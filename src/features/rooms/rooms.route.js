import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createRoomSchema } from "./rooms.validation.js";
import { createRoom, getAllRooms, getRoomById } from "./rooms.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const roomRoutes = Router();

roomRoutes.get("/", requireAuth, getAllRooms);
roomRoutes.post("/", requireAuth, validate(createRoomSchema), createRoom);

export default roomRoutes;