import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createRoomSchema, updateRoomSchema } from "./rooms.validation.js";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "./rooms.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const roomRoutes = Router();

roomRoutes.get("/", getAllRooms);
roomRoutes.post("/", requireAuth, validate(createRoomSchema), createRoom);
roomRoutes.get("/:id", getRoomById);
roomRoutes.put("/:id", requireAuth, validate(updateRoomSchema), updateRoom);
roomRoutes.delete("/:id", requireAuth, deleteRoom);

export default roomRoutes;