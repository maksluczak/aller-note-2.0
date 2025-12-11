const User = require('../../models/User');
const Location = require('../../models/Location');

const updateLocation = async (req, res) => {
    try {
        const userId = req.params.id;
        const { voivodeship } = req.body;

        if (!voivodeship) { return res.status(400).json({ message: "voivodeship is required" }); }

        const location = await Location.findOne({ voivodeship }).exec();
        if (!location) { return res.status(404).json({ message: "Location not found" }); }

        const user = await User.findByIdAndUpdate(
            userId,
            { userDefaultLocation: location._id },
            { new: true }
        ).exec();
        if (!user) { return res.status(404).json({ message: "User not found" }); }

        res.status(200).json({ message: "User location updated", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = updateLocation;