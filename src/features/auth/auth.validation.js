import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Nama wajib diisi" })
    .min(1, "Nama tidak boleh kosong")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid")
    .max(150, "Email maksimal 150 karakter"),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(6, "Password minimal harus memiliki 6 karakter")
    .max(255, "Password terlalu panjang"),
});
