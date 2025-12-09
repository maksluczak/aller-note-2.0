const User = require("../../models/User");
const Location = require("../../models/Location");

const getUserLocation = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const defaultLocation = user.userDefaultLocation;

        if (!defaultLocation) {
            return res.status(400).json({ message: "User location not found" });
        }

        const location = await Location.findById(defaultLocation);

        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        const voivodeship = location.voivodeship;

        return res.status(200).json({
            defaultLocation: voivodeship,
            message: "Location found successfully",
        });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = getUserLocation;