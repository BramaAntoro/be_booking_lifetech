import { createRoomService, getAllRoomsService, updateRoomService } from "./rooms.service.js";

export const createRoom = async (req, res) => {
  try {
    const newRoom = await createRoomService({ name: req.body.name });
    return res.status(201).json({
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

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await getAllRoomsService();
    return res.status(200).json({ status: "success", data: rooms });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Gagal mengambil data ruangan" });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await updateRoomService(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      status: "success",
      message: "Ruangan berhasil diperbarui",
      data: updatedRoom,
    });
  } catch (error) {
    if (error.message.includes("tidak ditemukan")) return res.status(404).json({ status: "fail", message: error.message });
    if (error.message.includes("Device ID sudah digunakan")) return res.status(400).json({ status: "fail", message: error.message });
    console.log(error)
    return res
      .status(500)
      .json({ status: "error", message: "Gagal memperbarui ruangan" });
  }
};
