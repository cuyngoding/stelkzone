import axios from "axios";

// Default axios config
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

export const login = async (email, password) => {
  try {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.post("/api/login", { email, password });

    const { user, token } = response.data;

    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { success: true, user, token };
    } else {
      return { success: false, message: "Login gagal. Data tidak lengkap." };
    }
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Terjadi kesalahan",
    };
  }
};

export const logout = async (setRole = null) => {
  try {
    await axios.post("/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (err) {
    console.warn("Logout gagal, tapi token lokal tetap dihapus.");
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  if (setRole) setRole(null);

  window.location.href = "/";
  window.location.reload();
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
