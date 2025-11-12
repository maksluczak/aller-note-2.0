const Location = require("../../models/Location");

const createLocation = async (req, res) => {
    const { voivodeship, longitude, latitude } = req.body;

    if (!voivodeship || !longitude || !latitude) {
        return res.status(400).json({
            message: "Latitude and longitude are required"
        })
    }

    try {
        const duplicateLocation = await Location.findOne({ voivodeship }).exec();

        if (duplicateLocation) {
            return res.status(409).json({ message: "Location already exists "});
        }
        const location = await Location.create({
            voivodeship: voivodeship,
            longitude: longitude,
            latitude: latitude
        });

        return res.status(201).json({
            message: "Location added successfully.",
            location: location
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = createLocation;