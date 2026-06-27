import { z } from "zod";

export const createRoomSchema = z.object({
  name: z
    .string({ required_error: "Nama ruangan wajib diisi" })
    .min(1, "Nama ruangan tidak boleh kosong")
    .max(100, "Nama ruangan maksimal 100 karakter"),
});