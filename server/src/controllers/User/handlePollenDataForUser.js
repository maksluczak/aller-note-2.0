const User = require("../../models/User");
const PollenData = require("../../models/PollenData");

const handlePollenDataForUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).exec();

    if (!user) {
        res.status(204).json({ message: "No user matches id" });
    }

    const locationId = req.params.pollenLocationId;
    const date = req.params.pollenDataDate;

    const { alderPollen, birchPollen, grassPollen, mugwortPollen, olivePollen, ragweedPollen } = req.body;

    const pollenData = await PollenData.create({
        date: date,
        alderPollen: alderPollen,
        birchPollen: birchPollen,
        grassPollen: grassPollen,
        mugwortPollen: mugwortPollen,
        olivePollen: olivePollen,
        ragweedPollen: ragweedPollen,
        pollenDataUser: user._id,
        pollenDataLocation: locationId
    });

    return res.status(201).json({ data: pollenData });
}

module.exports = handlePollenDataForUser;