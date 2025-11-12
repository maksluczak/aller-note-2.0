const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization header missing." });
    }

    const token = authHeader.split(' ')[1] || req.cookies?.jwt;
    const verifyToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await User.findById(verifyToken._id);

    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }

    req.user = user;
    next();
};

module.exports = verifyJWT;