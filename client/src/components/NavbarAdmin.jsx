import { useState } from "react";
import "./NavbarAdmin.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaChalkboardTeacher, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";
import { logout } from "../utils/auth";

function NavbarAdmin() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogout = () => {
    logout(); // Bersihkan token dan redirect ke halaman login
  };

  const toProfile = () => {
    navigate("/profile/admin");
  };

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  return (
    <>
      <div className="nav-container-admin">
        <button className="button-menu-admin" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>
        <div className="profile">
          <img
            className="user-photo-admin"
            src={PhotoProfile}
            alt="User Profile"
            onClick={toProfile}
          />
          <Link to="/profile/admin" className="user-name-admin">
            ROSE JOHAR
          </Link>
        </div>
        <button className="btn-logout-admin" onClick={handleLogout}>
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
            <Link to="/dashboard/admin">
              <GoHomeFill /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile/admin">
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaUsers /> Siswa
            </Link>
          </li>
          <li>
            <Link to="/dashboard/pembina/daftar-siswa">
              <FaChalkboardTeacher /> Pembina
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarAdmin;
