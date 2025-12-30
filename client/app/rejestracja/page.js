import React from "react";
import Card from "@/components/login/Card";
import GoBackIcon from "@/components/login/GoBackIcon";
import Form from "@/components/login/Form";
import Link from "next/link";
import Dandelion from "@/components/login/Dandelion";

export default function Registration() {
    return (
        <section className=" flex items-center pt-32 pb-10 lg:min-h-[calc(100vh-40px)]">
            <div className="invisible md:visible fixed bottom-0 left-[8vw] origin-bottom animate-[dandelion-left_18s_ease-in-out_infinite]">
                <Dandelion />
            </div>
            <div className="invisible md:visible fixed -bottom-14 left-[13vw] transform origin-bottom rotate-[30deg] animate-[dandelion-right_15s_ease-in-out_infinite]">
                <Dandelion />
            </div>
            <Card title="Rejestracja">
                <>
                    <Link
                        href="/login"
                        className="block w-10 p-2 absolute left-3 top-3 transform hover:-translate-x-1 hover:-rotate-12 transition-transform"
                    >
                        <GoBackIcon />
                    </Link>

                    <Form
                        password
                        email
                        nickname
                        registration
                        btnText={"Zarejestruj się"}
                    />
                </>
            </Card>
        </section>
    );
}
