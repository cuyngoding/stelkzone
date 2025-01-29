import "./Home.css";
import Navbar from "../components/Navbar";
import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";
import Capture from "../assets/capture.png";
import Gradasi from "../assets/gradasi.png";
import Pastelk from "../assets/pastelk.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate("/home/satrov");
  }
  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <header>
          <Navbar />
          </header>

          <h3 className="header1">STELKZONE - Home</h3>
          <br />
          <h1>EKSTRAKURIKULER SAYA</h1>
          <input
            className="search-bar"
            type="text"
            name=""
            id="search"
            placeholder="Search . . ."
          />
          <button type="search" id="go-search-btn">GO</button>

          <div className="card-container">
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA (SATRYA ROVER)</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button" onClick={handleCheck}>CHECK</button>
            </div>

            <div className="card">
              <img src={WebTech} alt="Satrya Rover" />
              <h3>WEB TECHNOLOGY</h3>
              <p className="jumlah-anggota">Jumlah: 10</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Capture} alt="Satrya Rover" />
              <h3>FOTOGRAFI (CAPTURE)</h3>
              <p className="jumlah-anggota">Jumlah: 9</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={Gradasi} alt="Satrya Rover" />
              <h3>MENGGAMBAR (GRADASI STELK)</h3>
              <p className="jumlah-anggota">Jumlah: 12</p>
              <button type="button">CHECK</button>
            </div>
            
            <div className="card">
              <img src={Pastelk} alt="Satrya Rover" />
              <h3>PASKIBRA STELK (PASTELK)</h3>
              <p className="jumlah-anggota">Jumlah: 17</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA SATRYA ROVER</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA SATRYA ROVER</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA SATRYA ROVER</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA SATRYA ROVER</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
