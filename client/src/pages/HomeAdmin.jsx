import { checkAuth, default as api } from "../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import "./Home.css";

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
  const [ekskuls, setEkskuls] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const auth = await checkAuth();
        if (!auth.success) {
          navigate("/");
          return;
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate("/");
        return;
      }

      try {
        // coba ambil daftar ekskul dari API admin (sesuaikan endpoint jika beda)
        const res = await api.get("/admin/ekskul");
        setEkskuls(res.data || []);
      } catch (err) {
        console.warn("Gagal fetch ekskul admin, pakai fallback statis", err);
        // fallback statis (sama seperti sebelumnya)
        setEkskuls([
          { id: 1, title: "PRAMUKA (SATRYA ROVER)", jumlah: 13, logo: SatryaRover },
          { id: 2, title: "REKAYASA WEB (WEB TECHNOLOGY)", jumlah: 10, logo: WebTech },
          { id: 3, title: "FOTOGRAFI (CAPTURE)", jumlah: 9, logo: Capture },
          { id: 4, title: "MENGGAMBAR (GRADASI STELK)", jumlah: 12, logo: Gradasi },
          { id: 5, title: "PASKIBRA STELK (PASTELK)", jumlah: 20, logo: Pastelk },
          { id: 6, title: "ROBOTIK (ELIPS)", jumlah: 7, logo: Elips },
          { id: 7, title: "ISLAMI (IKRAMTEL)", jumlah: 13, logo: Ikramtel },
          { id: 8, title: "JURNALISTIK (KOMERS)", jumlah: 13, logo: Komers },
          { id: 9, title: "CYBER SECURITY (CYBERDEF)", jumlah: 15, logo: Cyberdef },
        ]);
      }
    };

    init();
  }, [navigate]);

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
          <input className="search-bar" type="text" placeholder="Search . . ." />
          <button type="search" id="go-search-btn">
            GO
          </button>

          <div className="card-container">
            {ekskuls.length === 0 ? (
              <div className="empty-state">
                <h2>Tidak ada data ekskul</h2>
              </div>
            ) : (
              ekskuls.map((ekskul, index) => (
                <div className="card" key={index}>
                  <img src={ekskul.logo || ekskul.img} alt={ekskul.title} />
                  <h3>{ekskul.title || ekskul.nama}</h3>
                  <p className="jumlah-anggota">Jumlah: {ekskul.jumlah || ekskul.jumlah_anggota || 0}</p>
                  <button
                    type="button"
                    onClick={() => navigate(`/dashboard/admin/satrov/${ekskul.id}`)}
                  >
                    CHECK
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
