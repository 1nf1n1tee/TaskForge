import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    try {
        // 1. Read the Authorization header
        const authHeader = req.headers.authorization;

        // 2. Check whether a token was provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please log in.",
            });
        }

        // 3. Extract the token
        const token = authHeader.split(" ")[1];

        // 4. Check whether the JWT secret is configured
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment variables.");

            return res.status(500).json({
                success: false,
                message: "Authentication configuration error.",
            });
        }

        // 5. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 6. Attach the user's information to the request
        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token.",
            });
        }

        req.user = {
            userId: decoded.userId,
            email: decoded.email,
        };

        // 7. Allow the request to continue
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Your session has expired. Please log in again.",
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid authentication token.",
        });
    }
};

export default authenticateToken;