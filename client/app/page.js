"use client";
import NoteAnimatedSVG from "@/components/NoteAnimatedSVG";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
            <p className=" invisible  md:visible block absolute text-left right-0 bottom-5 text-lg max-w-[14.55em] text-black">
                Dzięki <strong>AllerNote</strong> w łatwy sposób zapanujesz nad alergią.
            </p>
            <div ref={btn} className="invisible">
                <Link
                    href="/rejestracja"
                    className="block px-[2.1rem] py-[.7rem]  rounded-[1.13rem] bg-eden-700 text-white transform hover:scale-105 transition-transform "
                >
                    Dołącz do nas już dziś!
                </Link>
            </div>
        </section>
    );
}
