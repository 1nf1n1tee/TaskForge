
import "dotenv/config";

import express from "express";
import cors from "cors";
import prisma from "./src/config/database.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskForge backend is running!",
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            success: true,
            message: "Database connected successfully!",
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed.",
        });
    }
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`TaskForge backend running on port ${PORT}`);
});
