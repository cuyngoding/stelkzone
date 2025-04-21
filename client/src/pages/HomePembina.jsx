import NavbarPembina from "../components/NavbarPembina";
import { useNavigate } from "react-router-dom";
import SatryaRover from "../assets/satrya-rover.png";
import "./HomePembina.css";

function HomePembina() {
  const navigate = useNavigate();

  const handleCheck = () => {
    console.log("Satrya Rover clicked");
    navigate("/dashboard/pembina/profile-eskul/satryarover");
  };

  const handleLogout = () => {
    // Menghapus token dan user dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Navigasi ke halaman login
    navigate("/");
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <header>
          <NavbarPembina />
        </header>

        <div className="top-bar-pembina">
          <h3 className="header1-pembina">STELKZONE - Dashboard</h3>
          
        </div>

        <br />
        <h1 className="header2-pembina">EKSTRAKURIKULER SAYA</h1>
        <input
          className="search-bar-pembina"
          type="text"
          placeholder="Search . . ."
        />
        <button type="search" id="go-search-btn-pembina">
          GO
        </button>

        <div className="card-container-pembina">
          <div className="card-pembina">
            <img src={SatryaRover} alt="Satrya Rover" />
            <h3>PRAMUKA (SATRYA ROVER)</h3>
            <p className="jumlah-anggota">Jumlah: 13</p>
            <button type="button" onClick={handleCheck}>
              CHECK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePembina;
