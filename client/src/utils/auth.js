import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Sesuaikan dengan URL backend Laravel

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { access_token, user } = response.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        `${API_URL}/logout`,
        {}, // Body kosong
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Hapus data di localStorage dan redirect ke halaman login
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => JSON.parse(localStorage.getItem("user"));
