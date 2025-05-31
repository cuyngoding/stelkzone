import { checkAuth } from "../utils/api";
import { getToken } from "../utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";
import Capture from "../assets/capture.png";
import Gradasi from "../assets/gradasi.png";
import Pastelk from "../assets/pastelk.png";
import Elips from "../assets/elips.png";
import Ikramtel from "../assets/ikramtel.png";
import Komers from "../assets/komers.png";
import Cyberdef from "../assets/cyberdef.png";

function HomeAdmin() {
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
      title: "PRAMUKA (SATRYA ROVER)",
      jumlah: 13,
      img: SatryaRover,
      onClick: () => navigate("/dashboard/admin/profile-eskul/satryarover"),
    },
    {
      title: "REKAYASA WEB (WEB TECHNOLOGY)",
      jumlah: 10,
      img: WebTech,
      onClick: () => navigate("/error"),
    },
    {
      title: "FOTOGRAFI (CAPTURE)",
      jumlah: 9,
      img: Capture,
      onClick: () => navigate("/error"),
    },
    {
      title: "MENGGAMBAR (GRADASI STELK)",
      jumlah: 12,
      img: Gradasi,
      onClick: () => {}, // nanti bisa ditambah navigasi
    },
    {
      title: "PASKIBRA STELK (PASTELK)",
      jumlah: 20,
      img: Pastelk,
      onClick: () => {},
    },
    {
      title: "ROBOTIK (ELIPS)",
      jumlah: 7,
      img: Elips,
      onClick: () => {},
    },
    {
      title: "ISLAMI (IKRAMTEL)",
      jumlah: 13,
      img: Ikramtel,
      onClick: () => {},
    },
    {
      title: "JURNALISTIK (KOMERS)",
      jumlah: 13,
      img: Komers,
      onClick: () => {},
    },
    {
      title: "CYBER SECURITY (CYBERDEF)",
      jumlah: 15,
      img: Cyberdef,
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <header>
            <NavbarAdmin />
          </header>

          <h3 className="header1">STELKZONE - Dashboard</h3>
          <br />
          <h1>EKSTRAKURIKULER</h1>
          <input
            className="search-bar"
            type="text"
            placeholder="Search . . ."
          />
          <button type="search" id="go-search-btn">
            GO
          </button>

          <div className="card-container">
            {ekskulList.map((ekskul, index) => (
              <div className="card" key={index}>
                <img src={ekskul.img} alt={ekskul.title} />
                <h3>{ekskul.title}</h3>
                <p className="jumlah-anggota">Jumlah: {ekskul.jumlah}</p>
                <button type="button" onClick={ekskul.onClick}>
                  CHECK
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
