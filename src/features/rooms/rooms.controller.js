import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
} from "./rooms.service.js";

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

export const getRoomById = async (req, res) => {
  try {
    const roomWithSchedules = await getRoomByIdService(req.params.id);

    if (!roomWithSchedules) {
      return res.status(404).json({
        status: "fail",
        message: "Ruangan tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      data: roomWithSchedules,
    });
  } catch (error) {
    console.error("Get Room By ID Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Gagal mengambil rincian data dan jadwal ruangan",
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await updateRoomService(req.params.id, req.body);
    return res.status(200).json({
      status: "success",
      message: "Ruangan berhasil diperbarui",
      data: updatedRoom,
    });
  } catch (error) {
    console.log("Update Room Error Log:", error.message);
    if (error.message.includes("tidak ditemukan")) {
      return res.status(404).json({ status: "fail", message: error.message });
    } else if (
      error.message.includes("Gagal mengubah status") ||
      error.message.includes("Device ID sudah digunakan")
    ) {
      return res.status(400).json({ status: "fail", message: error.message });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Gagal memperbarui ruangan",
      });
    }
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await deleteRoomService(req.params.id);
    return res
      .status(200)
      .json({ status: "success", message: "Ruangan berhasil dihapus" });
  } catch (error) {
    if (error.message.includes("tidak ditemukan"))
      return res.status(404).json({ status: "fail", message: error.message });
    return res
      .status(500)
      .json({ status: "error", message: "Gagal menghapus ruangan" });
  }
};
