import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Retrieve token from 'Authorization' header (expects format "Bearer <token>")
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ status: "failed", message: "No token provided" });
    }
    const tokenParts = authHeader.split(' ');
    const token = tokenParts.length === 2 ? tokenParts[1] : authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "failed", message: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export { verifyToken, generateToken };