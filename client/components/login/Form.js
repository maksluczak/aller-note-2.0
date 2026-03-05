"use client";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import ButtonPrimary from "../buttons/ButtonPrimary";
import LinkUnderline from "../buttons/LinkUnderline";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { loginSchema, registerSchema } from "@/lib/validationSchemas";

export default function Form({ password, nickname, email, btnText, registration = false }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputRepeatedPassword, setInputRepeatedPassword] = useState("");
    const [defaultLocation, setDefaultLocation] = useState("");

    const { login } = useAuth();

    useEffect(() => {
        const fetchDefaultLocationId = async () => {
            try {
                const data = await apiFetch(`/location/Małopolskie`);
                if (data) setDefaultLocation(data.id);
            } catch (err) {
                console.error("Błąd pobierania lokalizacji:", err);
            }
        };

        if (registration) {
            fetchDefaultLocationId();
        }
    }, [registration]);

    async function submitHandler(e) {
        e.preventDefault();

        const formData = {
            email: inputEmail,
            password: inputPassword,
            ...(registration && {
                username: inputName,
                repeatedPassword: inputRepeatedPassword
            })
        };

        const schema = registration ? registerSchema : loginSchema;
        const result = schema.safeParse(formData);

        if (!result.success) {
            alert(result.error.errors[0].message);
            return;
        }

        setLoadingText(registration ? "Rejestracja..." : "Logowanie...");
        setIsLoading(true);

        try {
            const path = registration ? "/auth/register" : "/auth/login";
            const body = registration
                ? { username: inputName, email: inputEmail, password: inputPassword, defaultLocation }
                : { email: inputEmail, password: inputPassword };

            const data = await apiFetch(path, {
                method: "POST",
                body: JSON.stringify(body),
                auth: false,
            });

            if (registration) {
                alert("Zarejestrowano pomyślnie. Zaloguj się.");
                clearInputs();
                router.push("/login");
            } else {
                if (data && data.accessToken) {
                    await login(data.accessToken);
                    clearInputs();
                    router.push("/kalendarz");
                } else {
                    throw new Error("Brak tokena w odpowiedzi serwera");
                }
            }
        } catch (err) {
            console.error("Błąd:", err);
            alert(err.message || "Wystąpił błąd podczas autoryzacji.");
        } finally {
            setIsLoading(false);
        }
    }

    function clearInputs() {
        setInputName("");
        setInputEmail("");
        setInputPassword("");
        setInputRepeatedPassword("");
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-8">
            {nickname && registration && (
                <InputBox
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    type="text"
                    id="nickname"
                    label="nazwa użytkownika"
                    placeholder="Gustaw"
                />
            )}
            {email && (
                <InputBox
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    type="email"
                    id="email"
                    label="email"
                    placeholder="example@gmail.com"
                />
            )}
            {password && (
                <InputBox
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    type="password"
                    id="password"
                    label="hasło"
                    placeholder="**********"
                />
            )}
            {password && registration && (
                <InputBox
                    value={inputRepeatedPassword}
                    onChange={(e) => setInputRepeatedPassword(e.target.value)}
                    type="password"
                    id="repeatedPassword"
                    label="powtórz hasło"
                    placeholder="**********"
                />
            )}

            <div className="flex mt-8 flex-col gap-2 items-center">
                <ButtonPrimary type="submit" disabled={isLoading}>
                    {isLoading ? loadingText : btnText}
                </ButtonPrimary>

                {!registration && (
                    <p className="text-center">
                        <span className="text-white/85">Nie masz konta?</span>{" "}
                        <LinkUnderline href="/rejestracja" text="Zarejestruj się" />
                    </p>
                )}
            </div>
        </form>
    );
}