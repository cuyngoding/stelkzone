import { useState } from "react";
import "./Navbar.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaUser  } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";

function Navbar() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogout = () => {
    navigate('/'); // navigasi ke halaman login
  };

  const toprofile = () => {
    navigate('/profile/siswa');
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="nav-container">
        <button className="button-menu" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>
        <div className="profile">
          <img className="user-photo" src={PhotoProfile} alt="User  Profile" onClick={toprofile} />
          <a href="/profile/siswa" className="user-name">BACO ANDAYANA BIN BASO</a>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className={`sidebar-offcanvas-container ${isSidebarVisible ? 'visible' : ''}`}>
        <ul>
          <li><a href="/dashboard/siswa"> <span><GoHomeFill/></span> Dashboard</a></li>
          <li><a href="/profile/siswa"> <span><FaUser /></span> Profile</a></li>
          <li><a href="/more-ekskul"><span className="icon-navigation-eskul"><FaUsersGear/></span> Ekskul lainnya</a></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;