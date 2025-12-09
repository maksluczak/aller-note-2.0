import React from "react";

export default function VoivodeshipSelect2() {
  const VOIVODESHIPS = [
    { name: "Dolnośląskie", value: "dolnoslaskim" },
    { name: "Kujawsko-pomorskie", value: "kujawsko-pomorskim" },
    { name: "Lubelskie", value: "lubelskim" },
    { name: "Lubuskie", value: "lubuskim" },
    { name: "Małopolskie", value: "malopolskim" },
    { name: "Mazowieckie", value: "mazowieckim" },
    { name: "Opolskie", value: "opolskim" },
    { name: "Podkarpackie", value: "podkarpackim" },
    { name: "Podlaskie", value: "podlaskim" },
    { name: "Pomorskie", value: "pomorskim" },
    { name: "Śląskie", value: "slaskim" },
    { name: "Świętokrzyskie", value: "swietokrzyskim" },
    { name: "Warmińsko-mazurskie", value: "warminsko-mazurskim" },
    { name: "Wielkopolskie", value: "wielkopolskim" },
    { name: "Zachodniopomorskie", value: "zachodniopomorskim" },
  ];
  return (
    <div>
      <select
        defaultValue={VOIVODESHIPS[4].value}
        name="voivodeship"
        className="block rounded-lg px-3 py-2 border-2 border-turquoise-500 bg-transparent"
      >
        {VOIVODESHIPS.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
