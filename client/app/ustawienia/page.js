"use client";

import { useState, useEffect } from "react";
import VoivodeshipSelect2 from "@/components/pollen/VoivodeshipSelect2";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const userId = user?.id;

  const [username, setUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRepeatedPassword, setInputRepeatedPassword] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await fetch(`http://localhost:8080/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username || "");
        } else {
          console.error("Błąd pobierania:", data.message);
        }
      } catch (err) {
        console.error("Błąd serwera:", err);
      }
    }

    fetchUser();
  }, [userId]);

  async function submitHandler(type) {
    if (!userId) {
      alert("Brak identyfikatora użytkownika");
      return;
    }

    if (type === "password" && inputRepeatedPassword !== inputPassword) {
      alert("Hasła się nie zgadzają");
      return;
    }

    try {
      let path = "";
      let body = {};

      if (type === "username") {
        path = `/user/username/${userId}`;
        body = { username: inputUsername };
      } else if (type === "password") {
        path = `/user/password/${userId}`;
        body = { password: inputPassword };
      }

      const res = await fetch(`http://localhost:8080${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Błąd:", data.message || res.statusText);
        alert(data.message || "Błąd w trakcie edytowania.");
        return;
      }

      if (type === "username") {
        setUsername(inputUsername);
        setInputUsername("");
        setIsEditingUsername(false);
      }
      if (type === "password") {
        setInputPassword("");
        setInputRepeatedPassword("");
        setIsEditingPassword(false);
      }
    } catch (err) {
      console.error("Błąd:", err);
      alert("Błąd serwera.");
    }
  }

  function cancelEdit(type) {
    if (type === "username") {
      setInputUsername("");
      setIsEditingUsername(false);
    }
    if (type === "password") {
      setInputPassword("");
      setInputRepeatedPassword("");
      setIsEditingPassword(false);
    }
  }

  return (
    <section className="flex flex-col gap-5 pt-24 pb-10 lg:min-h-[calc(100vh-40px)]">
      <header className="grid gap-3 py-5 px-4 grid-cols-2 lg:grid-cols-[1fr_.7fr] border-b border-gray-200 text-4xl font-bold">
        Ustawienia
      </header>

      <div className="py-5 px-4">
        <label className="text-gray-800 text-2xl font-bold block mb-2">
          Edytuj nazwę użytkownika
        </label>
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={isEditingUsername ? inputUsername : username}
            onChange={(e) => setInputUsername(e.target.value)}
            disabled={!isEditingUsername}
            placeholder="Podaj nową nazwę"
            className="w-full text-gray-800 text-base pl-2 pr-2 py-3 outline-none bg-transparent border-b-2 border-black focus:ring-0 focus:border-black"
          />
          {!isEditingUsername ? (
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-black"
              onClick={() => setIsEditingUsername(true)}
            >
              Edytuj
            </button>
          ) : (
            <>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-green-600 text-green-600"
                onClick={() => {
                  submitHandler("username")
                  logout()
                }}
              >
                Zapisz
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-red-600 text-red-600"
                onClick={() => cancelEdit("username")}
              >
                Anuluj
              </button>
            </>
          )}
        </div>
      </div>

      <div className="py-5 px-4">
        <label className="text-gray-800 text-2xl font-bold block mb-2">
          Edytuj hasło
        </label>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            disabled={!isEditingPassword}
            placeholder="Wprowadź nowe hasło"
            className="w-full text-gray-800 text-base pl-2 pr-2 py-3 outline-none bg-transparent border-b-2 border-black focus:ring-0 focus:border-black"
          />
          <input
            type="password"
            value={inputRepeatedPassword}
            onChange={(e) => setInputRepeatedPassword(e.target.value)}
            disabled={!isEditingPassword}
            placeholder="Powtórz nowe hasło"
            className="w-full text-gray-800 text-base pl-2 pr-2 py-3 outline-none border-b-2 border-black focus:ring-0 focus:border-black"
          />

          {!isEditingPassword ? (
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-black w-fit"
              onClick={() => setIsEditingPassword(true)}
            >
              Edytuj
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-green-600 text-green-600"
                onClick={() => {
                  submitHandler("password")
                  logout()
                }}
              >
                Zapisz
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-red-600 text-red-600"
                onClick={() => cancelEdit("password")}
              >
                Anuluj
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-5 px-4">
        <label className="text-gray-800 text-2xl font-bold block mb-2">
          Edytuj województwo
        </label>
        <div className="flex items-center gap-2 md:gap-4">
          <VoivodeshipSelect2 />
        </div>
      </div>
    </section>
  );
}
