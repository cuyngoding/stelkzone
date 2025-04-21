import { useState } from "react";
import "./NavbarAdmin.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUser  } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";

function NavbarAdmin() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogout = () => {
    navigate('/'); // navigasi ke halaman login
  };

  const toprofile = () => {
    navigate('/profile/pembina');
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="nav-container-admin">
        <button className="button-menu-admin" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>
        <div className="profile">
          <img className="user-photo-admin" src={PhotoProfile} alt="User  Profile" onClick={toprofile} />
          <a href="/profile/admin" className="user-name-admin">ROSE JOHAR</a>
        </div>
        <button className="btn-logout-admin" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className={`sidebar-offcanvas-container ${isSidebarVisible ? 'visible' : ''}`}>
        <ul>
          <li><a href="/dashboard/admin"> <span><GoHomeFill/></span> Dashboard</a></li>
          <li><a href="#"> <span><FaUser /></span> Profile</a></li>
          <li><a href="#"><span className="icon-navigation-eskul"><FaUsers/></span> Siswa</a></li>
          <li><a href="/dashboard/pembina/daftar-siswa"><span className="icon-navigation-eskul"><FaChalkboardTeacher/></span>Pembina</a></li>
        </ul>
      </div>
    </>
  );
}

export default NavbarAdmin;