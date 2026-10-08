"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/loading/Spinner";

export default function ProtectedRoute({ children }) {
    const { user, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/login");
        }
    }, [authLoading, user, router]);

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center pt-32 pb-10 min-h-[calc(100vh-40px)]">
                <Spinner />
            </div>
        );
    }

    return children;
}
