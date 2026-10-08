db = db.getSiblingDB("AllerNote");

const voivodeships = [
    { voivodeship: "Dolnośląskie", latitude: 51.1079, longitude: 17.0385 },
    { voivodeship: "Kujawsko-pomorskie", latitude: 53.1235, longitude: 18.0084 },
    { voivodeship: "Lubelskie", latitude: 51.2465, longitude: 22.5684 },
    { voivodeship: "Lubuskie", latitude: 51.9356, longitude: 15.5062 },
    { voivodeship: "Łódzkie", latitude: 51.7592, longitude: 19.4560 },
    { voivodeship: "Małopolskie", latitude: 50.0614, longitude: 19.9366 },
    { voivodeship: "Mazowieckie", latitude: 52.2297, longitude: 21.0122 },
    { voivodeship: "Opolskie", latitude: 50.6751, longitude: 17.9213 },
    { voivodeship: "Podkarpackie", latitude: 50.0412, longitude: 21.9991 },
    { voivodeship: "Podlaskie", latitude: 53.1325, longitude: 23.1688 },
    { voivodeship: "Pomorskie", latitude: 54.3520, longitude: 18.6466 },
    { voivodeship: "Śląskie", latitude: 50.2649, longitude: 19.0238 },
    { voivodeship: "Świętokrzyskie", latitude: 50.8661, longitude: 20.6286 },
    { voivodeship: "Warmińsko-mazurskie", latitude: 53.7784, longitude: 20.4801 },
    { voivodeship: "Wielkopolskie", latitude: 52.4064, longitude: 16.9252 },
    { voivodeship: "Zachodniopomorskie", latitude: 53.4285, longitude: 14.5528 },
];

voivodeships.forEach((loc) => {
    db.locations.updateOne(
        { voivodeship: loc.voivodeship },
        { $setOnInsert: { ...loc, locationUsers: [] } },
        { upsert: true }
    );
});
