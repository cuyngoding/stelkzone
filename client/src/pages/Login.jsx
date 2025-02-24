import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../utils/auth";
import ImageLogo from "../assets/logo_smk.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Email dan password harus diisi!",
      });
      return;
    }

    try {
      const response = await login(email, password);
      if (response.success) {
        localStorage.setItem("token", response.token);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Login berhasil, Anda akan diarahkan ke dashboard.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard/siswa");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal!",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Silakan coba lagi nanti.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ImageLogo} alt="logo SMK Telkom Makassar" />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="check">
          <input type="checkbox" name="Remember me" /> Remember me
        </p>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#D70000"
            d="M0,0L34.3,5.3C68.6,11,137,21,206,74.7C274.3,128,343,224,411,234.7C480,245,549,171,617,133.3C685.7,96,754,96,823,133.3C891.4,171,960,245,1029,245.3C1097.1,245,1166,171,1234,128C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Login;
