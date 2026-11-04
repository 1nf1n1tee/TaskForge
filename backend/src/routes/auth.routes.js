
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required.",
            });
        }

        if (name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty.",
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user,
        });

    } catch (error) {
        console.error("Registration error:", error);

        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong during registration.",
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase(),
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong during login.",
        });
    }
});
// GET /api/auth/me
router.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User account no longer exists.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Authenticated successfully!",
            user,
        });

    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
});

export default router;
