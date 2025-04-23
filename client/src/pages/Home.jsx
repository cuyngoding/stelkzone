import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import { checkAuth } from "../utils/api";
import { getToken } from "../utils/auth";

import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";
import Capture from "../assets/capture.png";
import Gradasi from "../assets/gradasi.png";
import Pastelk from "../assets/pastelk.png";
import Elips from "../assets/elips.png";
import Ikramtel from "../assets/ikramtel.png";
import Komers from "../assets/komers.png";
import Cyberdef from "../assets/cyberdef.png";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const result = await checkAuth();
      console.log("✅ checkAuth result:", result);
      if (!result.success) {
        navigate("/");
      }
    };

    verifyUser();
  }, [navigate]);

  const ekskulList = [
    {
      img: SatryaRover,
      title: "PRAMUKA (SATRYA ROVER)",
      jumlah: 13,
      onClick: () => navigate("/dashboard/siswa/profile-eskul/satryarover"),
    },
    {
      img: WebTech,
      title: "REKAYASA WEB (WEB TECHNOLOGY)",
      jumlah: 10,
      onClick: () => navigate("/error"),
    },
    {
      img: Capture,
      title: "FOTOGRAFI (CAPTURE)",
      jumlah: 9,
      onClick: () => navigate("/error"),
    },
    {
      img: Gradasi,
      title: "MENGGAMBAR (GRADASI STELK)",
      jumlah: 12,
    },
    {
      img: Pastelk,
      title: "PASKIBRA STELK (PASTELK)",
      jumlah: 20,
    },
    {
      img: Elips,
      title: "ROBOTIK (ELIPS)",
      jumlah: 7,
    },
    {
      img: Ikramtel,
      title: "ISLAMI (IKRAMTEL)",
      jumlah: 13,
    },
    {
      img: Komers,
      title: "JURNALISTIK (KOMERS)",
      jumlah: 13,
    },
    {
      img: Cyberdef,
      title: "CYBER SECURITY (CYBERDEF)",
      jumlah: 15,
    },
  ];

  return (
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
          placeholder="Search . . ."
        />
        <button type="search" id="go-search-btn">
          GO
        </button>

        <div className="card-container">
          {ekskulList.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="jumlah-anggota">Jumlah: {item.jumlah}</p>
              <button type="button" onClick={item.onClick}>
                CHECK
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
