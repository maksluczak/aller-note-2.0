const User = require("../../models/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    const { username, email, password, defaultLocation } = req.body;

    if (!username || !email || !password || !defaultLocation) {
        return res.status(400).json({
            message: "Username, email, and password are required."
        });
    }

    try {
        const duplicateEmail = await User.findOne({ email }).exec();
        const duplicateUsername = await User.findOne({ username }).exec();

        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already in use." });
        }
        if (duplicateUsername) {
            return res.status(409).json({ message: "Username already taken." });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPwd,
            userLocation: defaultLocation
        });

        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        res.status(400).json({ message: "Error in signing up", body: err });
    }
};

module.exports = handleRegister;