import { getToken, setToken, clearToken } from "@/lib/tokenStore";

export const API_URL = "http://localhost:8080";

async function rawFetch(path, options = {}) {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token && options.auth !== false) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${path}`, {
        credentials: "include",
        ...options,
        headers,
    });
}

export async function apiFetch(path, options = {}) {
    let res = await rawFetch(path, options);

    if (res.status === 401 && options.auth !== false) {
        const refreshRes = await rawFetch("/auth/refresh", {
            method: "GET",
            auth: false,
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            setToken(data.accessToken);

            res = await rawFetch(path, options);
        } else {
            clearToken();
            throw new Error("Session expired");
        }
    }

    if (res.status === 404) return null;

    if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(`API error ${res.status} ${text || ""}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return res.json();
    }

    return null;
}
