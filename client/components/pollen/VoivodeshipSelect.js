"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function VoivodeshipSelect({ defaultLocation, setDefaultLocation, VOIVODESHIPS }) {
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const res = await apiFetch(`/user/me/location/${userId}`);

        if (!res || !res.defaultLocation) {
          setDefaultLocation(5);
          return;
        }

        const userLocation = res.defaultLocation;
        const voivodeshipName = VOIVODESHIPS.find(
          (v) => v.name === userLocation
        );
        setDefaultLocation(voivodeshipName ? voivodeshipName.value : 5);
      } catch (err) {
        console.error("Błąd przy pobieraniu lokalizacji:", err);
        setDefaultLocation(5);
      }
    };
    if (user) {
      fetchUserLocation();
    } else {
      setDefaultLocation(5);
    }
  }, [user]);

  return (
    <div>
      <select
        value={defaultLocation}
        onChange={(e) => setDefaultLocation(Number(e.target.value))}
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
