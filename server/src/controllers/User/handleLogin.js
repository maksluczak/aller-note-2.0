const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "";

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: "User does not exist." });
        }

        const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
        if (isPasswordMatched) {
            const accessToken = jwt.sign({ _id: foundUser._id, email: foundUser.email }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            const refreshToken = jwt.sign({ _id: foundUser._id, email: foundUser.email}, REFRESH_TOKEN_SECRET, { expiresIn: "7d"});

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({ message: "User is signed in successfully", accessToken });
        } else {
            res.status(401).json({ message: "Passwords do not match" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = handleLogin;