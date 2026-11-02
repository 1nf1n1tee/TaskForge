
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// First API endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskForge backend is running!"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`TaskForge backend running on port ${PORT}`);
});
