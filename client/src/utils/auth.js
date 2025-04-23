// utils/auth.js

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

export const login = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("DATA LOGIN", data); // Debug hasil response

    // Ambil token dari response: bisa dari `token` atau `access_token`
    const token = data.token || data.access_token;

    if (token && data.user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true, token, user: data.user };
    } else {
      console.error("Token atau user tidak ditemukan dalam response");
      return { success: false, message: "Login gagal. Cek email/password." };
    }
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: err.message };
  }
};

// ✅ Logout bisa menerima setRole (opsional) dan redirect
export const logout = (setRole = null) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  if (setRole) setRole(null);

  // Paksa reload atau redirect ke halaman utama
  window.location.href = "/";
  window.location.reload();
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
