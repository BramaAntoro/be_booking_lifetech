import { z } from "zod";

export const createBookingSchema = z.object({
  roomId: z.string({ required_error: "Room ID wajib diisi" }).uuid("Format Room ID harus UUID"),
  bookedByName: z.string().max(100, "Nama maksimal 100 karakter").optional(),
  
  startTime: z.string({ required_error: "Waktu mulai wajib diisi" }).datetime({ 
    offset: true, 
    message: "Format harus ISO DateTime valid (mendukung UTC atau Offset)" 
  }),
});