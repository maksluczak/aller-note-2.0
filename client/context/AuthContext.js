"use client"
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 
import { apiFetch } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const setUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
        setUser({ id: decoded._id, email: decoded.email });
    } catch (err) {
      console.error('Token decode error', err);
      setUser(null);
    }
  };

  const login = async (token) => {
    localStorage.setItem("jwt", token);
    setUserFromToken(token);
    router.push("/kalendarz");
  };

  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("jwt");
      setUser(null);
      router.push("/login");
    }
  };

  const refreshToken = async () => {
    try {
      const res = await apiFetch("/auth/refresh", { method: "GET" });
      if (res?.accessToken) {
        localStorage.setItem("jwt", res.accessToken);
        setUserFromToken(res.accessToken);
        return res.accessToken;
      }
      return null;
    } catch (err) {
      setUser(null);
      localStorage.removeItem("jwt");
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
