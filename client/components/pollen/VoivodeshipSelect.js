"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function VoivodeshipSelect({
    defaultLocation,
    setDefaultLocation,
    VOIVODESHIPS,
    mode = "pollen",
    onSave = null,
}) {
    const { user } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        if (mode !== "pollen") { return; }

        const loadUserLocation = async () => {
            if (!user) {
                setDefaultLocation(5);
                return;
            }

            try {
                const res = await apiFetch(`/user/me/location/${userId}`);
                if (!res || !res.defaultLocation) {
                    setDefaultLocation(5);
                    return;
                }

                const found = VOIVODESHIPS.find((v) => v.name === res.defaultLocation);
                setDefaultLocation(found ? found.value : 5);
            } catch (err) {
                console.error("Błąd przy pobieraniu lokalizacji:", err);
                setDefaultLocation(5);
            }
        };
        loadUserLocation();
    }, [user]);

    // TODO: zmiana lokalizacji w ustawieniach, mode = "settings"
    const handleChange = async (value) => {
        setDefaultLocation(value);

        if (mode === "settings" && onSave) {
            await onSave(value);
        }
    };

    return (
        <div>
            <select
                value={defaultLocation}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="block rounded-lg px-3 py-2 border-2 border-turquoise-500 bg-transparent"
            >
                {VOIVODESHIPS.map((v) => (
                    <option key={v.value} value={v.value}>
                        {mode === "allergens" ? v.vvd : v.name}
                    </option>
                ))}
            </select>
        </div>
    );
}