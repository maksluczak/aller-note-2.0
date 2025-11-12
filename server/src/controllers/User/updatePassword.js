const bcrypt = require("bcrypt");
const User = require("../../models/User");
const updatePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(
            userId,
            { password: hashedPwd },
            { new: true }
        );
        return res.status(200).json({ message: "Password updated" });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = updatePassword;