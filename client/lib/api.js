export const API_URL = "http://localhost:8080";

async function rawFetch(path, options = {}) {
  const token = localStorage.getItem("jwt");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token && options.auth !== false) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });
  return res;
}

export async function apiFetch(path, options = {}) {
  let res = await rawFetch(path, options);

  if (res.status === 401) {
    const refreshRes = await rawFetch("/user/refresh", { method: "GET" });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      const newAccessToken = data.accessToken;
      localStorage.setItem("jwt", newAccessToken);

      res = await rawFetch(path, options);
    } else {
      throw new Error("Session expired");
    }
  }

  if (res.status === 404) {
    return null;
  }

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
