"use client";
import NoteAnimatedSVG from "@/components/NoteAnimatedSVG";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const features = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 12h12M10 17h8M10 22h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="25" cy="8" r="4" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M23.5 8l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        title: "Dziennik objawów",
        desc: "Zapisuj swoje objawy dzień po dniu. Ból głowy, katar, łzawiące oczy - wszystko w jednym miejscu, zawsze pod ręką.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 9v7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 5c2-1.5 5-2.5 9-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
        ),
        title: "Śledzenie pyłków",
        desc: "Monitoruj poziom pyłków w powietrzu i sprawdzaj, czy twoje samopoczucie jest z nimi powiązane.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 24l7-8 5 5 5-9 7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="16" r="2" fill="currentColor" opacity="0.3"/>
                <circle cx="16" cy="21" r="2" fill="currentColor" opacity="0.3"/>
                <circle cx="21" cy="12" r="2" fill="currentColor" opacity="0.3"/>
            </svg>
        ),
        title: "Wzorce i trendy",
        desc: "Odkryj zależności między pyłkami a swoimi objawami. Wiedza to pierwsza obrona przed alergią.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 10v6l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 16h3M8 16h3M16 8V5M16 27v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
        ),
        title: "Twoje dane, tylko Twoje",
        desc: "Każda notatka przypisana jest do Twojego konta. Bezpieczny dostęp z dowolnego urządzenia, w dowolnym miejscu.",
    },
];

const steps = [
    {
        number: "01",
        title: "Załóż konto",
        desc: "Rejestracja zajmuje mniej niż minutę. Żadnych zbędnych formularzy.",
    },
    {
        number: "02",
        title: "Zapisuj objawy",
        desc: "Codziennie dodawaj notatkę o tym, jak się czujesz. Krótko i konkretnie.",
    },
    {
        number: "03",
        title: "Obserwuj wzorce",
        desc: "AllerNote zestawia Twoje wpisy z danymi o pyłkach, byś wiedział, co Ci najbardziej dolega.",
    },
];

export default function Home() {
    const [tl, setTl] = useState();
    const aller = useRef();
    const btn = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();
        setTl(tl);

        tl.addLabel("start", 0);

        tl.from(
            aller.current,
            {
                autoAlpha: 0,
                y: 30,
                duration: 1.5,
                ease: "back.out(2)",
            },
            "start+=2.5"
        );
        tl.from(
            btn.current,
            {
                autoAlpha: 0,
                y: 30,
                duration: 1.5,
                ease: "back.out(2)",
            },
            "start+=2.6"
        );
    });

    return (
        <>
            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center gap-20 pt-32 pb-10 min-h-[calc(100vh-40px)]">
                <header className="relative w-full text-center font-bold text-white select-none">
                    <h1
                        ref={aller}
                        className="text-[20vw] text-eden-700 leading-none invisible"
                    >
                        Aller
                    </h1>
                    <h1 className="block -z-[1] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 outlines font-outline-2 text-transparent text-[35vw] tracking-wider">
                        <NoteAnimatedSVG timeline={tl} />
                    </h1>
                </header>
                <p className="invisible md:visible block absolute text-left right-0 bottom-5 text-lg max-w-[14.55em] text-black">
                    Dzięki <strong>AllerNote</strong> w łatwy sposób zapanujesz nad alergią.
                </p>
                <div ref={btn} className="invisible">
                    <Link
                        href="/rejestracja"
                        className="block px-[2.1rem] py-[.7rem] rounded-[1.13rem] bg-eden-700 text-white transform hover:scale-105 transition-transform"
                    >
                        Dołącz do nas już dziś!
                    </Link>
                </div>
            </section>

            {/* ── PROBLEM / WARTOŚĆ ── */}
            <section className="py-24 max-w-3xl mx-auto text-center px-4">
                <p className="text-xs uppercase tracking-[0.2em] text-eden-700 font-semibold mb-4">
                    Czy to brzmi znajomo?
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-snug mb-6">
                    Nie wiesz, dlaczego znowu masz katar?<br />
                    <span className="text-eden-700">AllerNote Ci to powie.</span>
                </h2>
                <p className="text-black/70 text-lg leading-relaxed">
                    Alergia potrafi być nieprzewidywalna. Jeden dzień jest znośny, drugi - nie do wytrzymania.
                    AllerNote łączy Twoje codzienne notatki z danymi o pyleniu, żebyś w końcu zobaczył wyraźny obraz tego, co Ci dolega.
                </p>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] text-eden-700 font-semibold mb-3 text-center">
                        Co zyskujesz
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-14">
                        Wszystko, czego potrzebujesz do kontroli alergii
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="group flex gap-5 p-6 rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm hover:border-eden-700/30 hover:shadow-md transition-all duration-300"
                            >
                                <div className="shrink-0 text-eden-700 mt-1">{f.icon}</div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">{f.title}</h3>
                                    <p className="text-black/60 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] text-eden-700 font-semibold mb-3 text-center">
                        Jak to działa
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-16">
                        Trzy kroki do lepszego samopoczucia
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-4 relative">
                        <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-eden-700/20" />
                        {steps.map((s, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center text-center px-4 relative">
                                <div className="w-16 h-16 rounded-full bg-eden-700/10 border-2 border-eden-700/30 flex items-center justify-center mb-5 relative z-10 bg-white">
                                    <span className="text-eden-700 font-bold text-lg">{s.number}</span>
                                </div>
                                <h3 className="font-bold text-black mb-2">{s.title}</h3>
                                <p className="text-black/60 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Zacznij rozumieć swoją alergię
                    </h2>
                    <p className="text-black/60 text-lg mb-10">
                        Bezpłatna rejestracja.
                    </p>
                    <Link
                        href="/rejestracja"
                        className="inline-block px-10 py-4 rounded-2xl bg-eden-700 text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-eden-700/20"
                    >
                        Załóż konto - to nic nie kosztuje
                    </Link>
                </div>
            </section>
        </>
    );
}