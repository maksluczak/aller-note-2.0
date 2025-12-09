const Location = require("../../models/Location");

const getPollenDataFromExternalAPI = async (req, res) => {
    try {
        const locationId = req.params.pollenLocationId;
        const location = await Location.findById(locationId).exec();

        if (!location) {
            return res.status(404).json({ message: "Nie znaleziono lokalizacji" });
        }

        const { longitude, latitude } = location;
        const timezone = "Europe/Berlin";

        const todayDate = new Date();
        const today = todayDate.getFullYear() + "-" + String(todayDate.getMonth() + 1).padStart(2, "0") + "-" + String(todayDate.getDate()).padStart(2, "0");

        const hourlyParams = [
            "alder_pollen",
            "birch_pollen",
            "grass_pollen",
            "mugwort_pollen",
            "olive_pollen",
            "ragweed_pollen"
        ].join(",");

        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams}&start_date=${today}&end_date=${today}&timezone=${timezone}`;

        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).json({ error: "Błąd API Open-Meteo", details: text });
        }

        const data = await response.json();

        if (!data.hourly || !data.hourly.time) {
            return res.status(500).json({ error: "Niepoprawne dane z API" });
        }

        const pollenData = {
            latitude,
            longitude,
            timezone,
            alder_pollen: data.hourly.alder_pollen?.[12] ?? null,
            birch_pollen: data.hourly.birch_pollen?.[12] ?? null,
            grass_pollen: data.hourly.grass_pollen?.[12] ?? null,
            mugwort_pollen: data.hourly.mugwort_pollen?.[12] ?? null,
            olive_pollen: data.hourly.olive_pollen?.[12] ?? null,
            ragweed_pollen: data.hourly.ragweed_pollen?.[12] ?? null
        };

        res.json(pollenData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = getPollenDataFromExternalAPI;