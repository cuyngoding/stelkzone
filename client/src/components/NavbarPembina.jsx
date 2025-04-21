import { useState } from "react";
import "./NavbarPembina.css";
import { LuMenu } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";

function NavbarPembina() {
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
      <div className="nav-container-pembina">
        <button className="button-menu-pembina" onClick={toggleSidebar}>
          <LuMenu className="menu-icon" />
        </button>
        <div className="profile">
          <img className="user-photo-pembina" src={PhotoProfile} alt="User  Profile" onClick={toprofile} />
          <a href="/profile/pembina" className="user-name-pembina">HARYADI INDRAWIJAYA</a>
        </div>
        <button className="btn-logout-pembina" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className={`sidebar-offcanvas-container ${isSidebarVisible ? 'visible' : ''}`}>
        <ul>
          <li><a href="/dashboard/pembina"> <span><GoHomeFill/></span> Dashboard</a></li>
          <li><a href="/profile/pembina"> <span><FaUser /></span> Profile</a></li>
          <li><a href="/dashboard/pembina/daftar-siswa"><span className="icon-navigation-eskul"><FaUsers/></span> Daftar Siswa</a></li>
        </ul>
      </div>
    </>
  );
}

export default NavbarPembina;