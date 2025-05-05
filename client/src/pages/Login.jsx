// src/pages/Login.jsx
import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageLogo from "../assets/logo_smk.png";
import { login } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Email dan password harus diisi!",
      });
    }

    try {
      const response = await login(email, password);

      if (!response.success) {
        return Swal.fire({
          icon: "error",
          title: "Login Gagal!",
          text: response.message || "Silakan coba lagi.",
        });
      }

      const user = response.user;
      localStorage.setItem("user", JSON.stringify(user));
      rememberMe
        ? localStorage.setItem("savedEmail", email)
        : localStorage.removeItem("savedEmail");

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${user.role} ${user.nama} !`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        const roleRedirects = {
          siswa: "/dashboard/siswa",
          pembina: "/dashboard/pembina",
          admin: "/dashboard/admin",
        };
        navigate(roleRedirects[user.role] || "/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Silakan coba lagi nanti.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ImageLogo} alt="logo SMK Telkom Makassar" />
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Remember me
          </p>
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#D70000"
            d="M0,0L34.3,5.3C68.6,11,137,21,206,74.7C274.3,128,343,224,411,234.7C480,245,549,171,617,133.3C685.7,96,754,96,823,133.3C891.4,171,960,245,1029,245.3C1097.1,245,1166,171,1234,128C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Login;
