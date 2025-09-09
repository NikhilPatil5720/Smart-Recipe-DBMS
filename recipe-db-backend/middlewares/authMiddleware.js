const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, '123abc', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.userId = decoded.userId; // Add userId to request object
            req.user = { user_id: decoded.userId };  // ✅ attach user_id

        next();
    });
};
