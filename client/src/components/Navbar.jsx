import { useState, useEffect } from "react";
import "./Navbar.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";
import { logout, getToken } from "../utils/auth";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [siswa, setSiswa] = useState({ nama: "" });

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8000/api/siswa/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSiswa(res.data);
      } catch (err) {
        console.error("Gagal mengambil data siswa di navbar:", err);
      }
    };
    fetchSiswa();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toprofile = () => {
    navigate("/profile/siswa");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="nav-container">
        <button className="button-menu" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>

        <div className="user-info">
          <img
            className="user-photo"
            src={PhotoProfile}
            alt="User Profile"
            onClick={toprofile}
          />
          <div className="user-name-siswa" onClick={toprofile}>{siswa.nama || "Siswa"}</div>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
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
            <a href="/dashboard/siswa">
              <span>
                <GoHomeFill />
              </span>{" "}
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile/siswa">
              <span>
                <FaUser />
              </span>{" "}
              Profile
            </a>
          </li>
          <li>
            <a href="/more-ekskul">
              <span className="icon-navigation-eskul">
                <FaUsersGear />
              </span>{" "}
              Ekskul lainnya
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
