import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "fail",
        message: "Akses ditolak. Silakan login terlebih dahulu."
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Sesi Anda telah berakhir. Silakan login ulang."
      });
    }

    return res.status(401).json({
      status: "fail",
      message: "Token tidak valid atau telah kedaluwarsa."
    });
  }
};