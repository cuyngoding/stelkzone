import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import api from "../utils/api"; // gunakan axios instance dengan token otomatis
import { checkAuth } from "../utils/api";

function Home() {
  const navigate = useNavigate();
const [ekskuls, setEkskuls] = useState([]);

useEffect(() => {
  const fetchEkskulSaya = async () => {
    try {
      const res = await api.get('/siswa/ekskul-saya');
      setEkskuls(res.data);
    } catch (err) {
      console.error("Gagal mengambil ekskul saya", err);
    }
  };

  fetchEkskulSaya();
}, []);


  return (
    <div className="home-page">
      <div className="home-container">
        <header>
          <Navbar />
        </header>

        <h3 className="header1">STELKZONE - Dashboard</h3>
        <br />
        <h1>EKSTRAKURIKULER SAYA</h1>

        <input className="search-bar" type="text" placeholder="Search . . ." />
        <button type="search" id="go-search-btn">
          GO
        </button>

        <div className="card-container">
              {ekskuls.length === 0 ? (
        <div className="empty-state">
          <h2>Kamu belum mengikuti ekskul apapun</h2>
        </div>
      ) : (
        ekskuls.map((ekskul, index) => (
          <div className="card" key={index}>
            <img src={ekskul.logo}  />
            <h3>{ekskul.nama}</h3>
            <p className="jumlah-anggota">Jumlah: {ekskul.jumlah_anggota || 0}</p>
            <button type="button" onClick={() => navigate(`/dashboard/siswa/satrov/${ekskul.id}`)}>
              CHECK
            </button>
          </div>
        ))
      )}

        </div>
      </div>
    </div>
  );
}

export default Home;
