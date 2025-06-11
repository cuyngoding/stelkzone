import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ← gunakan "/api"
  headers: {
    Accept: "application/json",
  },
});

// Interceptor untuk menyisipkan token secara otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fungsi login (admin/siswa/pembina)
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      return { success: true };
    }
    return { success: false, message: "Token tidak ditemukan." };
  } catch (err) {
    console.error("Login failed:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Login gagal",
    };
  }
};

// Fungsi cek user login
export const checkAuth = async () => {
  try {
    const response = await api.get("/user");
    return { success: true, user: response.data };
  } catch (err) {
    console.error("Auth check failed:", err);
    logout();
    return { success: false };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Ekspor instance API khusus
export default api;
