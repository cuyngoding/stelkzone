import { useNavigate } from "react-router-dom";
import './DaftarSiswaPembina.css';
import NavbarPembina from "../components/NavbarPembina";
import PhotoProfile from "../assets/user-profile.png";

function EskulLainnya() {
  const navigate = useNavigate();

  const eskuls = [
    { name: "BACO ANDAYANA BIN BASO", icon: PhotoProfile, route: "siswa" },
    { name: "ARTHAWAN PRATAMA PAKURIMBA AZZUHUD", icon: PhotoProfile, route: "#" },
    { name: "ALDRIN FABIO LEIMENA", icon: PhotoProfile, route: "#" },
    { name: "CHRISTIAN BAGASKARA", icon: PhotoProfile, route: "#" },
    { name: "MUHAMMAD ALIF AL FATH", icon: PhotoProfile, route: "#" },
    { name: "MUHAMMAD DZAKI HASYIM", icon: PhotoProfile, route: "#" },
   
  ];

  const handleNavigate = (route) => {
    navigate(`/profile/${route}`);
  };

  return (
    <>
      <NavbarPembina />
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

export default EskulLainnya;
