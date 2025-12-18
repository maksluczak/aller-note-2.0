"use client";

import React, {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

export default function SavePollen() {
    const [isHidden, setIsHidden] = useState(true);
    const { user } = useAuth();

    if (user) {
        return (
            <section className={`mx-auto items-center justify-center${ !isHidden ? "flex" : "hidden"}`}>
                <div className="mx-auto items-center justify-center text-center flex gap-7 bg-eden-700 text-white rounded-2xl p-8 max-w-[40rem]">
                    <div>
                        <h3 className="text-2xl font-bold text-center">
                            Zapisz dzisiejsze pylenie w swoim kalendarzu!
                        </h3>
                        <p className="pt-4">
                            Wracaj do swoich zapisów w dowolnym momencie i sprawdzaj poziom pylenia z wybranego dnia.
                        </p>
                        <div className="flex justify-around pt-4 gap-6">
                            <ButtonPrimary>
                                Zapisz
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section className={`mx-auto items-center justify-center${ !isHidden ? "flex" : "hidden"}`}>
                <div className="mx-auto items-center justify-center text-center flex gap-7 bg-eden-700 text-white rounded-2xl p-8 max-w-[40rem]">
                    <div>
                        <h3 className="text-2xl font-bold text-center">
                            Zapisz dzisiejsze pylenie w swoim kalendarzu!
                        </h3>
                        <p className="pt-4">
                            Zaloguj się lub załóż konto, aby zapisywać pylenie i wracać do historii w dowolnym momencie.
                        </p>
                        <div className="flex justify-around pt-4 gap-6">
                            <ButtonPrimary>
                                Zaloguj się
                            </ButtonPrimary>
                            <ButtonPrimary>
                                Zarejestruj się
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}