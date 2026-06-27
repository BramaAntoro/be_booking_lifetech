import {registerService} from "./auth.service.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerService({ name, email, password });

    return res.status(201).json({
      status: "success",
      message: "Akun berhasil didaftarkan",
      data: {
        user: user
      }
    });

  } catch (error) {
    if (error.message.includes("sudah terdaftar")) {
      return res.status(409).json({
        status: "fail",
        message: error.message
      });
    }

    console.error("Register Error Log:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan internal pada server"
    });
  }
};
