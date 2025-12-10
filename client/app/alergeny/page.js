"use client";
import AllergensTable from "@/components/pollen/AllergensTable";
import VoivodeshipSelect from "@/components/pollen/VoivodeshipSelect";
import React, {useState} from "react";

export default function Allergens() {
    const [defaultLocation, setDefaultLocation] = useState(5);

    const VOIVODESHIPS = [
        { name: "Dolnośląskie",         vvd: "Dolnośląskim",        value: 0 },
        { name: "Kujawsko-pomorskie",   vvd: "Kujawsko-pomorskim",  value: 1 },
        { name: "Lubelskie",            vvd: "Lubelskim",           value: 2 },
        { name: "Lubuskie",             vvd: "Lubuskim",            value: 3 },
        { name: "Łódzkie",              vvd: "Łódzkim",             value: 4 },
        { name: "Małopolskie",          vvd: "Małopolskim",         value: 5 },
        { name: "Mazowieckie",          vvd: "Mazowieckim",         value: 6 },
        { name: "Opolskie",             vvd: "Opolskim",            value: 7 },
        { name: "Podkarpackie",         vvd: "Podkarpackim",        value: 8 },
        { name: "Podlaskie",            vvd: "Podlaskim",           value: 9 },
        { name: "Pomorskie",            vvd: "Pomorskim",           value: 10 },
        { name: "Śląskie",              vvd: "Śląskim",             value: 11 },
        { name: "Świętokrzyskie",       vvd: "Świętokrzyskim",      value: 12 },
        { name: "Warmińsko-mazurskie",  vvd: "Warmińsko-mazurskim", value: 13 },
        { name: "Wielkopolskie",        vvd: "Wielkopolskim",       value: 14 },
        { name: "Zachodniopomorskie",   vvd: "Zachodniopomorskim",  value: 15 },
    ];

    return (
        <>
            <header className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-16 mt-32 lg:mt-44">
                <h1 className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span>Co teraz pyli w woj.</span>
                    <span className="flex items-center gap-2 md:gap-4">
                        <VoivodeshipSelect defaultLocation={defaultLocation} setDefaultLocation={setDefaultLocation} VOIVODESHIPS={VOIVODESHIPS} />
                        <span>?</span>
                    </span>
                </h1>
            </header>
            <section className="pb-10 lg:pb-16">
                <AllergensTable defaultLocation={defaultLocation} VOIVODESHIPS={VOIVODESHIPS} />
            </section>
        </>
    );
}
