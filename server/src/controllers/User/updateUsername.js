const User = require("../../models/User");

const updateUsername = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        );
        return res.status(201).json({ message: `Username updated: ${user}` });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = updateUsername;