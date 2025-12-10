const Location = require("../../models/Location");

const getPollenDataFromExternalAPI = async (req, res) => {
    try {
        const voivodeship = req.params.voivodeship;
        if (!voivodeship) {
            return res.status(400).json({ message: "Voivodeship name is required." });
        }
        const location = await Location.findOne({ voivodeship }).exec();
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

        const currentHour = new Date().getHours();
        const pollenIntensity = [
            data.hourly.alder_pollen?.[currentHour] ?? 0,
            data.hourly.birch_pollen?.[currentHour] ?? 0,
            data.hourly.grass_pollen?.[currentHour] ?? 0,
            data.hourly.mugwort_pollen?.[currentHour] ?? 0,
            data.hourly.olive_pollen?.[currentHour] ?? 0,
            data.hourly.ragweed_pollen?.[currentHour] ?? 0
        ];

        const maxIntensity = Math.max(...pollenIntensity);
        const maxIndex = pollenIntensity.indexOf(maxIntensity);

        const pollenIntensityScale = pollenIntensity.map(pollen => {
            if (pollen <= 1) return 0;
            if (pollen < 50) return 1;
            return 2;
        });

        const pollenData = {
            voivodeship: voivodeship,
            alder_pollen: pollenIntensityScale[0],
            birch_pollen: pollenIntensityScale[1],
            grass_pollen: pollenIntensityScale[2],
            mugwort_pollen: pollenIntensityScale[3],
            olive_pollen: pollenIntensityScale[4],
            ragweed_pollen: pollenIntensityScale[5],
            highest_pollen_intensity_index: maxIndex
        };

        res.json(pollenData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = getPollenDataFromExternalAPI;