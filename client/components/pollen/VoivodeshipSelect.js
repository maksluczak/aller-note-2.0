"use client";
import React, {useEffect} from "react";
import {apiFetch} from "@/lib/api";
import {useAuth} from "@/context/AuthContext";

export default function VoivodeshipSelect({
        defaultLocation,
        setDefaultLocation,
        VOIVODESHIPS,
        mode = "pollen",
        onSave = null
    }) {
    const { user } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        if (mode !== "pollen") return;
        const loadUserLocation = async () => {
            if (!userId) {
                setDefaultLocation(5);
                return;
            }
            try {
                const res = await apiFetch(`/user/me/location/${userId}`);
                const found = VOIVODESHIPS.find(
                    (v) => v.name === res?.defaultLocation
                );
                setDefaultLocation(found?.value ?? 5);
            } catch (e) {
                console.error("Błąd w pobieraniu lokalizacji:", e);
                setDefaultLocation(5);
            }
        };
        loadUserLocation();
    }, [userId, mode, VOIVODESHIPS, setDefaultLocation]);

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
                        {mode === "pollen" ? v.vvd : v.name}
                    </option>
                ))}
            </select>
        </div>
    );
}