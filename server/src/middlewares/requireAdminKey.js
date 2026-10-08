const requireAdminKey = (req, res, next) => {
    const key = req.headers["x-admin-key"];

    if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
};

module.exports = requireAdminKey;
