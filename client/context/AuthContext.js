"use client"
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { apiFetch } from "@/lib/api";
import { setToken, clearToken } from "@/lib/tokenStore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();

    const setUserFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUser({ id: decoded._id, email: decoded.email, location: decoded.location });
        } catch (err) {
            console.error('Token decode error', err);
            setUser(null);
        }
    };

    const login = async (token, redirected = true) => {
        setAccessToken(token);
        setToken(token);
        setUserFromToken(token);

        if (redirected) router.push("/kalendarz");
    };

    const logout = async () => {
        try {
            await apiFetch("/auth/logout", { method: "POST" });
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            clearToken();
            setAccessToken(null);
            setUser(null);
            router.push("/login");
        }
    };

    const refreshToken = useCallback(async () => {
        try {
            const data = await apiFetch("/auth/refresh", {
                method: "GET",
                auth: false
            });

            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                setToken(data.accessToken);
                setUserFromToken(data.accessToken);
                return data.accessToken;
            }

            return null;
        } catch (err) {
            setUser(null);
            clearToken();
            return null;
        }
    }, []);

    useEffect(() => {
        if (!accessToken) return;

        const interval = setInterval(() => {
            refreshToken();
        }, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, [accessToken, refreshToken]);

    useEffect(() => {
        const initAuth = async () => {
            await refreshToken();
            setAuthLoading(false);
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, authLoading, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
