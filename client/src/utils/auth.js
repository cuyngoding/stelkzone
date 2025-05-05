// src/utils/auth.js
import axios from "axios";

// Buat instance axios lokal dengan baseURL dan interceptor
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Tambahkan token otomatis dari localStorage sebelum setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ambil token dari localStorage
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

// Ambil user dari localStorage
export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Login (admin/pembina/siswa)
export const login = async (email, password) => {
  try {
    let response;
    try {
      // Coba login sebagai siswa
      response = await api.post("/siswa/login", { email, password });
    } catch {
      // Jika gagal, coba login sebagai admin/pembina
      response = await api.post("/login", { email, password });
    }

    return handleLoginSuccess(response);
  } catch (err) {
    return handleLoginError(err);
  }
};

// Logout
export const logout = async (setRole = null) => {
  try {
    await api.post("/logout");
  } catch (err) {
    console.warn("Logout error (lanjut hapus token lokal).");
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];

  if (setRole) setRole(null);
  window.location.href = "/";
};

// Helper: jika login berhasil
const handleLoginSuccess = (response) => {
  const { token, user, siswa } = response.data;
  const identity = user || siswa;

  // Jika role tidak ada dari backend, beri default
  if (!identity.role) {
    identity.role = user ? "admin" : "siswa";
  }

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(identity));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { success: true, user: identity };
  } else {
    return { success: false, message: "Token tidak ditemukan." };
  }
};

// Helper: jika login gagal
const handleLoginError = (err) => {
  console.error("Login error:", err);
  return {
    success: false,
    message: err.response?.data?.message || "Login gagal",
  };
};
