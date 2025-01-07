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
          <img className="user-photo" src={PhotoProfile} alt="User  Profile" />
          <h3 className="user-name">Nama User</h3>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className={`sidebar-offcanvas-container ${isSidebarVisible ? 'visible' : ''}`}>
        <ul>
          <li><a href="#"> <span><GoHomeFill/></span> Home</a></li>
          <li><a href="#"> <span><FaUser /></span> Profile</a></li>
          <li><a href="#"><span className="icon-navigation-eskul"><FaUsersGear/></span> Eskul lainnya</a></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;