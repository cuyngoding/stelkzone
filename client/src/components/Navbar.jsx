import "./Navbar.css";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../assets/user-profile.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/'); // navigasi ke halaman login
  };

  return (
    <>
    <div className="nav-container">
      <button className="button-menu">
        <LuMenu className="menu-icon" />
      </button>
      <div className="profile">
        <img className="user-photo" src={PhotoProfile} alt="User Profile" />
        <h3 className="user-name">Nama User</h3>
      </div>
      <button className="btn-logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
    
    <div className="sidebar-offcanvas-container">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Eskul lainnya</a></li>
      </ul>
    </div>
    </>
  );
}

export default Navbar;