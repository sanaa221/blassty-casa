const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Un token est requis pour l\'authentification' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token invalide' });
    }
    return next();
};

module.exports = verifyToken;
