const Location = require("../../models/Location");

const getLocationByVoivodeship = async (req, res) => {
    try {
        const voivodeship = req.params.voivodeship;
        if (!voivodeship) {
            return res.status(400).json({ message: "Voivodeship name is required." });
        }

        const location = await Location.findOne({ voivodeship }).exec();
        if (!location) {
            return res.status(404).json({ message: "Location not found." });
        }

        return res.status(200).json({
            message: "Location found",
            id: location._id,
            location
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = getLocationByVoivodeship;