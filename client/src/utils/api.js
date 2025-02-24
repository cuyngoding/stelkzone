import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // Agar Laravel Sanctum bisa membaca cookie
});

export default api;
