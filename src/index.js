import express from "express";
import authRoutes from "./features/auth/auth.route.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
