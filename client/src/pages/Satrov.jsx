import { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUser } from '../utils/auth';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import BackButton from "../components/ButtonBack";
import './Satrov.css';

function Satrov() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [ekskul, setEkskul] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (user?.role !== 'siswa') {
      Swal.fire('Akses ditolak', 'Hanya siswa yang dapat mendaftar ekskul.', 'error');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      api.get(`/ekskuls/${id}`)
        .then((res) => setEkskul(res.data))
        .catch(() => {
          Swal.fire('Error', 'Gagal memuat data ekskul', 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="satrov-page"><p>Memuat data...</p></div>;
  if (!ekskul) return null;

  return (
    <div className="satrov-page">
      <Navbar />

      {/* Logo & Nama */}
      <img className="logo-eskul" src={ekskul.logo} alt={ekskul.nama} />
      <h1 className="nama-eskul">{ekskul.nama}</h1>

      {/* Container Flex (Deskripsi + Struktur) */}
      <div className="satrov-container">
        <div>
          <h3 className="desc-label-eskul">Deskripsi</h3>
          <p className="desc-eskul">{ekskul.deskripsi}</p>
        </div>

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

      {/* Anggota */}
      <h1 className="header-daftar-anggota">Anggota</h1>
      <table className="table-anggota">
        <thead>
          <tr className="table-header">
            <th>Nama</th>
            <th>NIS</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BACO ANDAYANA BIN BASO</td>
            <td>544231000</td>
            <td>XI RPL 1</td>
          </tr>
          <tr>
            <td>ARTHAWAN PRATAMA PAKURIMBA AZZUHUD</td>
            <td>544231001</td>
            <td>XI RPL 4</td>
          </tr>
        </tbody>
      </table>

      <BackButton />
    </div>
  );
}

export default Satrov;
