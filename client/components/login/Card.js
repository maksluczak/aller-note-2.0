import React from "react";

export default function Card({ title, children }) {
    return (
        <section className="relative flex-grow mx-auto px-4 py-8 bg-eden-500 text-white rounded-3xl max-w-[27rem] shadow-md sm:p-11 md:ml-auto md:mr-0">
            <header className="mb-14 text-center">
                <h2 className="font-semibold text-4xl">{title}</h2>
            </header>

            {children}
        </section>
    );
}
