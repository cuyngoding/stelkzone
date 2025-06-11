import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import './SatrovDaftar.css'; // gunakan CSS yang sama

function Satrov() {
  const { id } = useParams();
  const [ekskul, setEkskul] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/ekskuls/${id}`)
      .then(res => setEkskul(res.data))
      .catch(() => {
        console.error('Gagal mengambil data ekskul');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="satrov-page"><p>Memuat data ekskul...</p></div>;
  if (!ekskul) return <p>Ekskul tidak ditemukan</p>;

  return (
    <div className="satrov-page">
      <Navbar />
      <img className="logo-eskul" src={ekskul.logo} alt={ekskul.nama} />
      <h1 className="nama-eskul">{ekskul.nama}</h1>

      <h3 className="desc-label-eskul">Deskripsi</h3>
      <p className="desc-eskul">{ekskul.deskripsi}</p>

      <div className="structure-satrov">
        {ekskul.pembina && (
          <>
            <label className="pembina">Pembina</label>
            <input className="value-satrov" type="text" value={ekskul.pembina} readOnly />
          </>
        )}
        {ekskul.pembina_putra && (
          <>
            <label className="pembina">Pembina Putra</label>
            <input className="value-satrov" type="text" value={ekskul.pembina_putra} readOnly />
          </>
        )}
        {ekskul.pembina_putri && (
          <>
            <label className="pembina">Pembina Putri</label>
            <input className="value-satrov" type="text" value={ekskul.pembina_putri} readOnly />
          </>
        )}

        {ekskul.ketua && (
          <>
            <label className="ketua">Ketua</label>
            <input className="value-satrov" type="text" value={ekskul.ketua} readOnly />
          </>
        )}
        {ekskul.ketua_putra && (
          <>
            <label className="ketua">Ketua Putra</label>
            <input className="value-satrov" type="text" value={ekskul.ketua_putra} readOnly />
          </>
        )}
        {ekskul.ketua_putri && (
          <>
            <label className="ketua">Ketua Putri</label>
            <input className="value-satrov" type="text" value={ekskul.ketua_putri} readOnly />
          </>
        )}
      </div>
    </div>
  );
}

export default Satrov;
