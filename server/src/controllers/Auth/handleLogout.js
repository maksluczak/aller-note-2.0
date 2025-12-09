const User = require("../../models/User");

const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies.jwt;

        if (!refreshToken) {
            return res.sendStatus(204);
        }

        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            return res.status(403).json({message: "User not found"});
        }

        foundUser.refreshToken = "";
        await foundUser.save();

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        return res.sendStatus(204);
    } catch (err) {
        return res.status(401).json({ error: err });
    }
};

module.exports = handleLogout;
