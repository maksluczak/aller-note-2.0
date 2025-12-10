"use client";
import React, {useEffect} from "react";
import IntensityLabel from "./IntensityLabel";
import {useState} from "react";
import {apiFetch} from "@/lib/api";

export default function AllergensTable({ defaultLocation, VOIVODESHIPS }) {
    const [alderPollenIntensity, setAlderPollenIntensity] = useState(0);
    const [birchPollenIntensity, setBirchPollenIntensity] = useState(0);
    const [grassPollenIntensity, setGrassPollenIntensity] = useState(0);
    const [mugwortPollenIntensity, setMugwortPollenIntensity] = useState(0);
    const [olivePollenIntensity, setOlivePollenIntensity] = useState(0);
    const [ragweedPollenIntensity, setRagweedPollenIntensity] = useState(0);

    const POLLEN_DATA = [
        { name: "Olcha", intensity: alderPollenIntensity, setter: setAlderPollenIntensity },
        { name: "Brzoza", intensity: birchPollenIntensity, setter: setBirchPollenIntensity },
        { name: "Trawa", intensity: grassPollenIntensity, setter: setGrassPollenIntensity },
        { name: "Bylica pospolita", intensity: mugwortPollenIntensity, setter: setMugwortPollenIntensity },
        { name: "Drzewo oliwne", intensity: olivePollenIntensity, setter: setOlivePollenIntensity },
        { name: "Ambrozja", intensity: ragweedPollenIntensity, setter: setRagweedPollenIntensity },
    ];

    useEffect(() => {
        const fetchPollenData = async () => {
            const voivodeship = VOIVODESHIPS[defaultLocation].name;
            console.log(voivodeship);
            try {
                const data = await apiFetch(`/pollen/${voivodeship}`);
                console.log(data);

                if (data) {
                    setAlderPollenIntensity(data.alder_pollen);
                    setBirchPollenIntensity(data.birch_pollen);
                    setGrassPollenIntensity(data.grass_pollen);
                    setMugwortPollenIntensity(data.mugwort_pollen);
                    setOlivePollenIntensity(data.olive_pollen);
                    setRagweedPollenIntensity(data.ragweed_pollen);
                }
            } catch (err) {
                console.log({error: err, message: "Error fetching data"});
            }
        };

        fetchPollenData();
    }, [defaultLocation]);

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-32">
      <header className="grid gap-3 py-5 px-4 grid-cols-2 lg:grid-cols-[1fr_.7fr] border-b border-gray-200 font-light uppercase">
        <span>Nazwa</span>
        <span>Nasilenie</span>
      </header>
      <header className="hidden py-5 px-4 lg:grid gap-3 grid-cols-2 lg:grid-cols-[1fr_.7fr] border-b border-gray-200 font-light uppercase">
        <span>Nazwa</span>
        <span>Nasilenie</span>
      </header>
      {POLLEN_DATA.map(({ name, intensity }) => (
        <li
          key={name}
          className="grid gap-3 py-5 px-4 grid-cols-2 lg:grid-cols-[1fr_.7fr] items-center border-b border-gray-200"
        >
          <span>{name}</span>
          <div>
            <IntensityLabel intensity={intensity} />
          </div>
        </li>
      ))}
    </ul>
  );
}
