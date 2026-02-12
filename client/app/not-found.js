"use client";
import React from "react";

import Dandelion from "@/components/login/Dandelion";

import { useRef } from "react";
import Header from "@/components/404/Header";

export default function Custom404() {
    const container = useRef(null);

    return (
        <section
            ref={container}
            className="flex items-start justify-center pt-32 pb-10 lg:min-h-[calc(100vh-40px)]"
        >
            <Header />

            <div className="w-[17rem] invisible md:visible fixed -bottom-3 left-[23vw] transform -rotate-[15deg] origin-bottom animate-[dandelion-1_22s_ease-in-out_infinite] z-[2]">
                <Dandelion />
            </div>
            <div className="w-[10rem] invisible md:visible fixed -bottom-14 left-[30vw] transform origin-bottom rotate-[30deg] animate-[dandelion-2_17s_ease-in-out_infinite] opacity-15">
                <Dandelion />
            </div>
            <div className=" w-[14rem] invisible md:visible fixed -bottom-28 left-[45vw] transform origin-bottom -rotate-[7deg] animate-[dandelion-3_17s_ease-in-out_infinite]  opacity-40">
                <div className="fly">
                    <Dandelion />
                </div>
            </div>
            <div className="w-[11.5rem] invisible md:visible fixed -bottom-14 left-[49vw] transform origin-bottom rotate-[20deg] animate-[dandelion-4_15s_ease-in-out_infinite] z-[2]">
                <Dandelion />
            </div>
            <div className="w-[15rem] invisible md:visible fixed -bottom-14 left-[60vw] transform origin-bottom rotate-[20deg] animate-[dandelion-5_29s_ease-in-out_infinite] opacity-70">
                <Dandelion />
            </div>
        </section>
    );
}
