// components/RedirectByRole.js
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RedirectByRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setRole(parsedUser.role);
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setRole(null);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // bisa diganti loader/spinner
  }

  if (role === "admin") return <Navigate to="/dashboard/admin" />;
  if (role === "pembina") return <Navigate to="/dashboard/pembina" />;
  if (role === "siswa") return <Navigate to="/dashboard/siswa" />;

  return <Navigate to="/" />; // fallback kalau role tidak valid
};

export default RedirectByRole;
