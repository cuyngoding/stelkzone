import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './EskulLainnya.css';
import Navbar from "../components/Navbar";
import api from "../utils/api";

function EskulLainnya() {
  const navigate = useNavigate();
  const [eskuls, setEskuls] = useState([]);

  useEffect(() => {
    api.get('/ekskuls')
      .then(res => {
        setEskuls(res.data);
      })
      .catch(() => {
        console.error('Gagal mengambil data ekskul');
      });
  }, []);

  const handleNavigate = (id) => {
    navigate(`/more-ekskul/daftar/${id}`); // ✅ arahkan ke path dinamis
  };

  return (
    <>
      <Navbar />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input className="bar-search" type="text" placeholder="Search . . ." />
          <button className='search-btn' type="search">GO</button>
        </div>

        <div className="eskul-list">
          {eskuls.length === 0 ? (
            <div className="empty-state">
              <h2>Tidak ada ekskul tersedia 😢</h2>
            </div>
          ) : (
            eskuls.map((ekskul) => (
              <div key={ekskul.id} className="eskul-item">
                <img src={ekskul.logo} alt={ekskul.nama} className='eskul-icon' />
                <div className="eskul-info">
                  <h2>{ekskul.nama}</h2>
                </div>
                <div className="eskul-members">
                  <span>Jumlah: {ekskul.jumlah_anggota || 0}</span>
                  <button className="arrow-btn" onClick={() => handleNavigate(ekskul.id)}>→</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default EskulLainnya;
