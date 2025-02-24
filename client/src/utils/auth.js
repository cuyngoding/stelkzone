import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Sesuaikan dengan backend Laravel

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { access_token, user } = response.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => JSON.parse(localStorage.getItem("user"));
