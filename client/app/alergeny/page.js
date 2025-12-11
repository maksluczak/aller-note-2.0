"use client";
import {useState} from "react";
import AllergensTable from "@/components/pollen/AllergensTable";
import VoivodeshipSelect from "@/components/pollen/VoivodeshipSelect";
import {VOIVODESHIPS} from "@/lib/voivodeships";

export default function Allergens() {
    const [defaultLocation, setDefaultLocation] = useState(5);

    return (
        <>
            <header className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-16 mt-32 lg:mt-44">
                <h1 className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span>Co teraz pyli w woj.</span>
                    <span className="flex items-center gap-2 md:gap-4">
                        <VoivodeshipSelect
                            defaultLocation={defaultLocation}
                            setDefaultLocation={setDefaultLocation}
                            VOIVODESHIPS={VOIVODESHIPS}
                            mode="allergens"
                        />
                        <span>?</span>
                    </span>
                </h1>
            </header>
            <section className="pb-10 lg:pb-16">
                <AllergensTable
                    defaultLocation={defaultLocation}
                    VOIVODESHIPS={VOIVODESHIPS}
                />
            </section>
        </>
    );
}
