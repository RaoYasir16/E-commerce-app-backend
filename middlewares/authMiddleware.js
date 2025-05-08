const jwt = require("jsonwebtoken");

// Token verify Function
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded; 

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Role verify Function
const authorizeRole = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access forbidden"
            });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRole };
