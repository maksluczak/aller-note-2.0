const User = require('../../models/User');
const Location = require('../../models/Location');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "";

const refreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies?.jwt;

        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
        if (!foundUser) {
            return res.status(403).json({message: "User not found"});
        }

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const userLocation = await Location.findById(foundUser.userLocation);

        if (foundUser._id.toString() === decoded._id) {
            const accessToken = jwt.sign({ _id: foundUser._id, email: foundUser.email, location: userLocation.voivodeship }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            return res.status(200).json({ accessToken });
        } else {
            return res.status(403).json({message: "User not found"});
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }
};

module.exports = refreshToken;
