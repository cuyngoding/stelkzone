import { getToken, logout } from "./auth"; // ✅ tambahkan logout

const API_BASE = "http://127.0.0.1:8000/api";

export const checkAuth = async () => {
  const token = getToken();

  if (!token) {
    return { success: false };
  }

  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json", // Laravel kadang butuh ini
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();
    return { success: true, user: data };
  } catch (err) {
    console.error("Auth check failed:", err);
    logout(); // ✅ hapus token kalau gagal
    return { success: false };
  }
};
