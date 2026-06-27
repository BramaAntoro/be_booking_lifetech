import { z } from "zod";

export const createRoomSchema = z.object({
  name: z
    .string({ required_error: "Nama ruangan wajib diisi" })
    .min(1, "Nama ruangan tidak boleh kosong")
    .max(100, "Nama ruangan maksimal 100 karakter"),
});

export const updateRoomSchema = z.object({
  name: z
    .string()
    .min(1, "Nama ruangan tidak boleh kosong")
    .max(100, "Nama ruangan maksimal 100 karakter")
    .optional(),
  deviceId: z
    .string()
    .max(255, "Device ID terlalu panjang")
    .nullable()
    .optional(),
  status: z
    .enum(["AVAILABLE", "MAINTENANCE"], {
      error_map: () => ({ message: "Status harus AVAILABLE atau MAINTENANCE" }),
    })
    .optional(),
});