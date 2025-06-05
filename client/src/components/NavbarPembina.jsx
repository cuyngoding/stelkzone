import { useState, useEffect } from "react";
import "./NavbarPembina.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";
import axios from "axios";
import { getToken } from "../utils/auth"; // pastikan fungsi ini ada

function NavbarPembina() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [pembina, setPembina] = useState({ nama: "" }); // ← state nama pembina

  useEffect(() => {
    const fetchPembina = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8000/api/pembina/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPembina(res.data);
      } catch (err) {
        console.error("Gagal mengambil data pembina:", err);
      }
    };

    fetchPembina();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toprofile = () => {
    navigate("/profile/pembina");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="nav-container-pembina">
        <button className="button-menu-pembina" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>
        <div className="profile">
          <img
            className="user-photo-pembina"
            src={PhotoProfile}
            alt="User Profile"
            onClick={toprofile}
          />
          <span className="user-name-pembina">{pembina.nama || "Pembina"}</span>
        </div>
        <button className="btn-logout-pembina" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div
        className={`sidebar-offcanvas-container ${
          isSidebarVisible ? "visible" : ""
        }`}
      >
        <ul>
          <li>
            <a href="/dashboard/pembina">
              <GoHomeFill /> Dashboard
            </a>
          </li>
          <li>
            <a href="/profile/pembina">
              <FaUser /> Profile
            </a>
          </li>
          <li>
            <a href="/dashboard/pembina/daftar-siswa">
              <FaUsers /> Daftar Siswa
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarPembina;
