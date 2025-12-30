"use client";

import React, { useState, useEffect } from "react";
import { formatDate, formatDateForBackend } from "@/utils/date";
import CustomRadio from "./CustomRadio";
import CustomRadioToEdit from "./CustomRadioToEdit";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { noteSchema } from "@/lib/validationSchemas";

export default function SymptomsNote({ selectedDate }) {
    const today = new Date();
    const selectedDateToString = formatDate(selectedDate);
    const selectedDateForBackend = formatDateForBackend(selectedDate);

    const { user } = useAuth();

    const [samopoczucie, setSamopoczucie] = useState(null);
    const [bolGlowy, setBolGlowy] = useState(null);
    const [katar, setKatar] = useState(null);
    const [nos, setNos] = useState(null);
    const [oko, setOko] = useState(null);
    const [kaszel, setKaszel] = useState(null);
    const [note, setNote] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [noteExists, setNoteExists] = useState(false);

    const SYMPTOMS = [
        {
            symptom: "samopoczucie",
            currentValue: samopoczucie,
            stateSetter: setSamopoczucie,
        },
        {
            stateSetter: setBolGlowy,
            currentValue: bolGlowy,
            symptom: "ból głowy",
        },
        {
            stateSetter: setKatar,
            currentValue: katar,
            symptom: "katar",
        },
        {
            stateSetter: setNos,
            currentValue: nos,
            symptom: "swędzenie oczu",
        },
        {
            stateSetter: setOko,
            currentValue: oko,
            symptom: "swędzenie nosa",
        },
        {
            stateSetter: setKaszel,
            currentValue: kaszel,
            symptom: "kaszel",
        },
    ];

    useEffect(() => {
        if (!user) return;

        const fetchNote = async () => {
            try {
                const data = await apiFetch(`/note/${selectedDateForBackend}`);

                if (data && data.note) {
                    const n = data.note;
                    setSamopoczucie(n.wellBeing);
                    setBolGlowy(n.headache);
                    setKatar(n.runnyNose);
                    setNos(n.itchyNose);
                    setOko(n.itchyEyes);
                    setKaszel(n.cough);
                    setNote(n.freeNote || "");
                    setNoteExists(true);
                } else {
                    resetForm();
                }
            } catch (err) {
                if (err.message === "API error 404") {
                    setNoteExists(false);
                    resetForm();
                } else {
                    console.error("Brak notatki lub błąd pobierania:", err.message);
                    resetForm();
                }
            }
        };
        fetchNote();
    }, [selectedDateForBackend, user]);

    const resetForm = () => {
        setSamopoczucie(null);
        setBolGlowy(null);
        setKatar(null);
        setNos(null);
        setOko(null);
        setKaszel(null);
        setNote("");
        setNoteExists(false);
        setIsEditing(false);
    };

    async function submitHandler(e) {
        e.preventDefault();
        setIsEditing(false);

        const validation = noteSchema.safeParse({
            free_note: note,
        });

        if (!validation.success) {
            alert(validation.error.errors[0].message);
            return;
        }
        const validatedNote = validation.data.free_note;

        const body = {
            well_being: samopoczucie,
            headache: bolGlowy,
            runny_nose: katar,
            itchy_nose: nos,
            itchy_eyes: oko,
            cough: kaszel,
            free_note: validatedNote,
            note_date: selectedDateForBackend
        };

        try {
            if (noteExists) {
                await apiFetch(`/note/${selectedDateForBackend}`, {
                    method: "PUT",
                    body: JSON.stringify(body),
                });
                console.log("Zaktualizowano notatkę");
            } else {
                await apiFetch(`/note/${selectedDateForBackend}`, {
                    method: "POST",
                    body: JSON.stringify(body),
                });
                setNoteExists(true);
                console.log("Utworzono nową notatkę");
            }
        } catch (err) {
            console.error("Błąd zapisu notatki:", err.message);
        }
    }

    if (!user) return <p>Musisz być zalogowany, aby dodać notatkę.</p>;

    return (
        <section className="flex flex-col">
            <header className="mb-9">
                <h1 className="flex justify-between items-center text-3xl font-bold">
                    {selectedDateToString}
                </h1>
            </header>
            <form className="flex flex-col gap-8 ">
                <div>
                    <header className="mb-2">
                        <h2 className="text-xl first-line:italic">MOJE OBIAWY:</h2>
                    </header>
                    <div className="lg:pr-16">
                        {SYMPTOMS.map(({ stateSetter, currentValue, symptom }) =>
                            isEditing ? (
                                <CustomRadio
                                    key={symptom}
                                    stateSetter={stateSetter}
                                    currentValue={currentValue}
                                    symptom={symptom}
                                />
                            ) : (
                                <CustomRadioToEdit
                                    key={symptom}
                                    symptom={symptom}
                                    currentValue={currentValue}
                                />
                            )
                        )}
                    </div>
                </div>

                <div>
                    <header className="mb-2 mt-5">
                        <h2 className="text-xl italic">NOTATKA:</h2>
                    </header>

                    {isEditing ? (
                        <textarea
                            id="userNote"
                            value={note}
                            onChange={(e) => {
                                if (e.target.value.length <= 500) {
                                    setNote(e.target.value);
                                }
                            }}
                            rows="5"
                            className="block mt-0.5 p-1.5 w-full h-44 text-sm border bg-white rounded-lg resize-none shadow-md"
                            placeholder="Dzisiaj czuję się..."
                        ></textarea>
                    ) : (
                        <textarea
                            disabled
                            id="userNote"
                            value={note}
                            rows="5"
                            className="block mt-0.5 p-1.5 w-full h-44 text-sm border bg-white rounded-lg resize-none shadow-md"
                            placeholder="Dzisiaj czuję się..."
                        ></textarea>
                    )}
                    <p className="text-sm text-gray-500 text-right">
                        {note.length}/500
                    </p>
                </div>
                <div className="ml-auto flex gap-5">
                    {!isEditing ? (
                        <ButtonPrimary style="green" onClick={() => setIsEditing(true)}>
                            Edytuj
                        </ButtonPrimary>
                    ) : (
                        <>
                            <ButtonPrimary
                                type="reset"
                                style="red"
                                onClick={() => setIsEditing(false)}
                            >
                                Anuluj
                            </ButtonPrimary>
                            <ButtonPrimary
                                type="submit"
                                style="green"
                                onClick={submitHandler}
                            >
                                Zapisz
                            </ButtonPrimary>
                        </>
                    )}
                </div>
            </form>
        </section>
    );
}