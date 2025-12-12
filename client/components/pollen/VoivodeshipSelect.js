"use client";
import React from "react";

export default function VoivodeshipSelect({
        defaultLocation,
        setDefaultLocation,
        VOIVODESHIPS,
        mode = "pollen",
        onSave = null
    }) {
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