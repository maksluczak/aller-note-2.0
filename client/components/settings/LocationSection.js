"use client"
import {VOIVODESHIPS} from "@/lib/voivodeships";
import VoivodeshipSelect from "@/components/pollen/VoivodeshipSelect";
import {apiFetch} from "@/lib/api";

export default function LocationSection({ defaultLocation, setDefaultLocation, userId }) {
    async function saveLocation(index) {
        const voivodeship = VOIVODESHIPS[index].name;

        await apiFetch(`/user/me/location/${userId}`, {
            method: "PUT",
            body: JSON.stringify({ voivodeship })
        });
    }

    return (
        <div className="py-5 px-4">
            <label className="text-gray-800 text-2xl font-bold block mb-2">
                Edytuj województwo
            </label>

            <VoivodeshipSelect
                defaultLocation={defaultLocation}
                setDefaultLocation={setDefaultLocation}
                VOIVODESHIPS={VOIVODESHIPS}
                mode="settings"
                onSave={saveLocation}
            />
        </div>
    );
}