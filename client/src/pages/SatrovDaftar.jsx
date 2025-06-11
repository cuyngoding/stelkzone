import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUser } from '../utils/auth';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import './SatrovDaftar.css';

function SatrovDaftar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [siswaId, setSiswaId] = useState(null);
  const [ekskul, setEkskul] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (user?.role === 'siswa') {
      setSiswaId(user.id);
    } else {
      Swal.fire('Akses ditolak', 'Hanya siswa yang dapat mendaftar ekskul.', 'error');
      navigate('/'); // atau redirect ke dashboard
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      api.get(`/ekskuls/${id}`)
        .then((res) => {
          setEkskul(res.data);
        })
        .catch(() => {
          Swal.fire('Error', 'Gagal memuat data ekskul', 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleDaftar = () => {
    if (!siswaId || !ekskul) {
      Swal.fire('Info', 'Sedang memuat data, silakan tunggu.', 'info');
      return;
    }

    api.post('/pendaftaran-ekskul', {
      siswa_id: siswaId,
      ekskul_id: ekskul.id,
    })
    .then(() => {
      Swal.fire({
        title: "Berhasil Daftar",
        text: `Anda berhasil mendaftar ke ekskul ${ekskul.nama}.`,
        icon: "success"
      })
    })
    .catch((error) => {
      if (error.response?.status === 409) {
        Swal.fire('Gagal', 'Kamu sudah mendaftar ekskul ini.', 'warning');
      } else {
        Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan.', 'error');
      }
    });
  };

  if (loading) return <div className="satrov-page"><p>Memuat data...</p></div>;
  if (!ekskul) return null;

  return (
    <div className="satrov-page">
      <Navbar />
      <img className="logo-eskul" src={ekskul.logo} alt={ekskul.nama} />
      <h1 className="nama-eskul">{ekskul.nama}</h1>
      <button
        className="daftar-btn"
        onClick={handleDaftar}
        disabled={!siswaId}
      >
        DAFTAR
      </button>

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

export default SatrovDaftar;
