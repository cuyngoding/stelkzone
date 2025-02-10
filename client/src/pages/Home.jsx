import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";
import Capture from "../assets/capture.png";
import Gradasi from "../assets/gradasi.png";
import Pastelk from "../assets/pastelk.png";
import Elips from "../assets/elips.png";
import Ikramtel from "../assets/ikramtel.png";
import Komers from "../assets/komers.png";
// import Cyberdev from "../assets/cyberdev.jpg"; // Import langsung tanpa dynamic import

function Home() {
  const navigate = useNavigate();

  const handleCheck = () => {
    navigate("/home/satryarover");
  };

  const errorCheck = () => {
    navigate("/error");
    console.log("%cError 404 Not Found", "color: red; font-weight: bold;");
  };

  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <header>
            <Navbar />
          </header>

          <h3 className="header1">STELKZONE - Dashboard</h3>
          <br />
          <h1>EKSTRAKURIKULER SAYA</h1>
          <input
            className="search-bar"
            type="text"
            name=""
            id="search"
            placeholder="Search . . ."
          />
          <button type="search" id="go-search-btn">
            GO
          </button>

          <div className="card-container">
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA (SATRYA ROVER)</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button" onClick={handleCheck}>
                CHECK
              </button>
            </div>

            <div className="card">
              <img src={WebTech} alt="Web Technology" />
              <h3>REKAYASA WEB (WEB TECHNOLOGY)</h3>
              <p className="jumlah-anggota">Jumlah: 10</p>
              <button type="button" onClick={errorCheck}>
                CHECK
              </button>
            </div>

            <div className="card">
              <img src={Capture} alt="Capture" />
              <h3>FOTOGRAFI (CAPTURE)</h3>
              <p className="jumlah-anggota">Jumlah: 9</p>
              <button type="button" onClick={errorCheck}>
                CHECK
              </button>
            </div>

            <div className="card">
              <img src={Gradasi} alt="Gradasi Stelk" />
              <h3>MENGGAMBAR (GRADASI STELK)</h3>
              <p className="jumlah-anggota">Jumlah: 12</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Pastelk} alt="Pastelk" />
              <h3>PASKIBRA STELK (PASTELK)</h3>
              <p className="jumlah-anggota">Jumlah: 20</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Elips} alt="Elips" />
              <h3>ROBOTIK (ELIPS)</h3>
              <p className="jumlah-anggota">Jumlah: 7</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Ikramtel} alt="Ikramtel" />
              <h3>ISLAMI (IKRAMTEL)</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Komers} alt="Komers" />
              <h3>JURNALISTIK (KOMERS)</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={SatryaRover} alt="Cyber Security" />
              <h3>CYBER SECURITY (CYBERDEV)</h3>
              <p className="jumlah-anggota">Jumlah: 15</p>
              <button type="button">CHECK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
