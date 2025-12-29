"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Grass from "./Grass";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { POLLEN_DESCRIPTION } from "@/lib/pollenDescription";

export default function Badge() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const [pollenIndex, setPollenIndex] = useState(0);
    const [pollenIntensity, setPollenIntensity] = useState(0);

    const voivodeship = user?.location;
    useEffect(() => {
        if (!voivodeship) return;

        const fetchPollenData = async () => {
            try {
                const data = await apiFetch(`/pollen/${voivodeship}`);
                setPollenIntensity(data.highest_pollen_intensity);
                setPollenIndex(data.highest_pollen_intensity_index);
            } catch (err) {
                console.error("Error fetching pollen data", err);
            }
        };
        fetchPollenData();
    }, [voivodeship]);

    if (!user || !isOpen) return null;

    const badgeData = pollenIntensity !== 0 ? POLLEN_DESCRIPTION[pollenIndex + 1] : POLLEN_DESCRIPTION[0];

    return (
        <section className="mx-auto relative flex flex-col items-start gap-7 bg-eden-700 text-white rounded-2xl p-5 pt-12 md:pl-8 md:pr-72 md:py-7 max-w-[50rem]">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 p-1 z-20"
                aria-label="Zamknij"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <h3 className="text-3xl font-bold relative z-[1]">
                {badgeData.header}
            </h3>
            <p className="text-gray-200 max-w-[30rem] relative z-[1]">
                {badgeData.description}
            </p>
            {pollenIntensity !== 0 && (
                <Link
                    href="/alergeny"
                    className="relative block px-4 py-2 rounded-xl hover:scale-105 transition-transform text-eden-500 bg-white z-[1]"
                >
                    Inne pyłki dzisiaj
                </Link>
            )}
            <div className="absolute left-0 bottom-0 w-full opacity-10 pointer-events-none">
                <Grass />
            </div>
        </section>
    );
}