// src/utils/auth.js

import axios from "axios";

const API_BASE = "http://localhost:8000";

axios.defaults.baseURL = API_BASE;
axios.defaults.headers.common.Accept = "application/json";

// Fungsi ambil token
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

// Fungsi simpan token
export const setToken = (token) => {
  localStorage.setItem("token", token);

  // 🔥 SET HEADER GLOBAL Axios di sini
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Fungsi hapus token (logout)
export const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

// Cek apakah sudah login
export const checkAuth = async () => {
  const token = getToken();
  if (!token) {
    return { success: false };
  }

  // 🔥 Set Authorization kalau belum ada (buat handle reload halaman)
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get("/api/user");
    return { success: true, user: response.data };
  } catch (err) {
    console.error("Auth check failed:", err);
    logout();
    return { success: false };
  }
};

// Fungsi login
export const login = async (email, password) => {
  try {
    const response = await axios.post("/api/login", { email, password });
    const { token } = response.data;

    if (token) {
      setToken(token); // 🔥 setToken juga auto set header axios
      return { success: true };
    } else {
      return { success: false, message: "Token tidak ditemukan." };
    }
  } catch (err) {
    console.error("Login failed:", err);
    return { success: false, message: err.response?.data?.message || "Login gagal" };
  }
};
