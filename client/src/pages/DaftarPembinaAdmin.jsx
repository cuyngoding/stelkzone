import { useNavigate } from "react-router-dom";
import './DaftarSiswaPembina.css';
import PhotoProfile from "../assets/user-profile.png";
import NavbarAdmin from "../components/NavbarAdmin";

function DaftarPembinaAdmin() {
  const navigate = useNavigate();

  const eskuls = [
    // munculkan data siswa di sini
    { name: "HARYADI INDRAWIJAYA", icon: PhotoProfile, route: "siswa" },
    { name: "OKTAVIANTO VYAN", icon: PhotoProfile, route: "#" },
    
  ];

  const handleNavigate = (route) => {
    navigate(`/profile/${route}`);
  };

  return (
    <>
      <NavbarAdmin />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input className="bar-search" type="text" placeholder="Search . . ." />
          <button className='search-btn' type="search">GO</button>
        </div>

        <div className="eskul-list">
          {eskuls.map((eskul, index) => (
            <div key={index} className="eskul-item">
              <img src={eskul.icon} alt={eskul.name} className='eskul-icon' />
              <div className="eskul-info">
                <h2>{eskul.name}</h2>
              </div>
              <div className="eskul-members">
                <button className="arrow-btn" onClick={() => handleNavigate(eskul.route)}>→</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DaftarPembinaAdmin;
