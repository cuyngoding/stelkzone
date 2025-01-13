import "./Home.css";
import Navbar from "../components/Navbar";
import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";


function Home() {
  return (
    <>
        <div className="home-container">
          <Navbar />
          <h3 className="header1">STELKZONE - Beranda</h3>
          <br />
          <h1>EKSTRAKURIKULER SAYA</h1>
          <input className="search-bar" type="text" name="" id="search" placeholder="Search . . ." />
          <button id="go-search-btn">GO</button>

          <div className="card-container">
          
            <div className="card">
              <img src={SatryaRover} alt="Satrya Rover" />
              <h3>PRAMUKA (SATRYA ROVER)</h3>
              <p className="jumlah-anggota">Jumlah: 13</p>
              <button type="button">CHECK</button>
            </div>

            <div className="card">
              <img src={WebTech} alt="Satrya Rover" />
              <h3>WEB TECHNOLOGY</h3>
              <p className="jumlah-anggota">Jumlah: 10</p>
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
    </>
  )
}

export default Home