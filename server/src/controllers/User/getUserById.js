const User = require("../../models/User");

const getUserById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const userId = req.params.id;
        const user = await User.findById(userId).populate("userLocation").exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = getUserById;