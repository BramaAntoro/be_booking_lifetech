import {loginService, registerService} from "./auth.service.js";

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


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authData = await loginService({ email, password });

    return res.status(200).json({
      status: "success",
      message: "Login berhasil",
      data: authData
    });

  } catch (error) {
    if (error.message.includes("Email atau password salah")) {
      return res.status(401).json({
        status: "fail",
        message: error.message
      });
    }

    console.error("Login Error Log:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan internal pada server"
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "Logout berhasil."
    });
  } catch (error) {
    console.error("Logout Error Log:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan internal pada server"
    });
  }
};