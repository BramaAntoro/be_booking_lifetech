import jwt from "jsonwebtoken";
import { createBookingService } from "./booking.service.js";

export const createBooking = async (req, res) => {
  try {
    const { roomId, bookedByName, startTime } = req.body;
    const authHeader = req.headers.authorization;

    let finalUserId = null;
    let finalBookedByName = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasiaEI");
        
        finalUserId = decoded.id;
        finalBookedByName = decoded.name;
      } catch (jwtError) {
        finalUserId = null;
      }
    }

    if (!finalBookedByName) {
      if (!bookedByName || bookedByName.trim() === "") {
        return res.status(400).json({
          status: "fail",
          message: "Nama pemesan wajib diisi jika tidak login via Web Admin"
        });
      }
      finalBookedByName = bookedByName;
    }

    const newBooking = await createBookingService({
      userId: finalUserId,
      roomId,
      bookedByName: finalBookedByName,
      startTime,
    });

    return res.status(201).json({
      status: "success",
      message: "Ruangan berhasil di-booking",
      data: newBooking
    });

  } catch (error) {
    if (error.message.includes("tabrakan") || error.message.includes("perbaikan") || error.message.includes("tidak ditemukan")) {
      return res.status(400).json({ status: "fail", message: error.message });
    }
    console.error("Booking Controller Error:", error);
    return res.status(500).json({ status: "error", message: "Terjadi kesalahan pada server" });
  }
};