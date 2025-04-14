export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("DATA LOGIN", data); // Debug hasil response

    // Ambil token dari response: bisa dari `token` atau `access_token`
    const token = data.token || data.access_token;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true, token, user: data.user };

    } else {
      console.error("Token tidak ditemukan dalam response");
      return { success: false, message: "Token tidak ditemukan." };
    }
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: err.message };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
