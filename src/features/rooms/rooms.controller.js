import { createRoomService } from "./rooms.service.js";

export const createRoom = async (req, res) => {
  try {
    const newRoom = await createRoomService({ name: req.body.name });
    return res
      .status(201)
      .json({
        status: "success",
        message: "Ruangan berhasil dibuat",
        data: newRoom,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Gagal membuat ruangan" });
  }
};
