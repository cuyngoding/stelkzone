import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Sesuaikan dengan backend Laravel
  withCredentials: true, // Agar Laravel Sanctum bisa membaca cookie
});

export default api;
