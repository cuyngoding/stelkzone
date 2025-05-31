import { useNavigate } from "react-router-dom";
import './DaftarPembinaAdmin.css';
import PhotoProfile from "../assets/user-profile.png";
import NavbarAdmin from "../components/NavbarAdmin";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import BackButton from "../components/ButtonBack";
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const MySwal = withReactContent(Swal);

function DaftarPembinaAdmin() {
  const navigate = useNavigate();
  const [pembinaList, setPembinaList] = useState([]);

  const fetchPembina = async () => {
    const token = getToken();
    try {
      const res = await fetch("http://localhost:8000/api/pembinas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal mengambil data pembina");

      const data = await res.json();
      const pembinaData = data.map((p) => ({
        id: p.id,
        name: p.nama,
        icon: PhotoProfile,
        route: "#",
      }));

      setPembinaList(pembinaData);
    } catch (error) {
      console.error("Error saat fetch pembina:", error);
      setPembinaList([]);
    }
  };

  useEffect(() => {
    fetchPembina();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/profile-pembina/admin/${id}`);
  };

  const handleHapusPembina = async (id) => {
    const konfirmasi = await MySwal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data pembina akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    });

    if (konfirmasi.isConfirmed) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8000/api/pembinas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPembinaList((prevList) => prevList.filter((p) => p.id !== id));
        Swal.fire("Terhapus!", "Data pembina berhasil dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus pembina:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };

  const handleTambahData = async () => {
    const result = await MySwal.fire({
      html: `
        <div class="form-container">
          <img src="${PhotoProfile}" alt="profile" class="profile-icon"/>
          <label for="nama">NAMA</label>
          <input id="nama" type="text" class="swal2-input" />
          <label for="nip">NIP</label>
          <input id="nip" type="text" class="swal2-input" />
          <label for="tgl">TANGGAL LAHIR</label>
          <input id="tgl" type="date" class="swal2-input" />
          <label for="alamat">ALAMAT</label>
          <input id="alamat" type="text" class="swal2-input" />
        </div>
      `,
      confirmButtonText: 'Confirm',
      showCloseButton: true,
      customClass: {
        popup: 'tambah-data-popup',
        confirmButton: 'confirm-btn',
      },
      buttonsStyling: false,
      preConfirm: () => ({
        nama: document.getElementById("nama").value,
        nip: document.getElementById("nip").value,
        tanggal_lahir: document.getElementById("tgl").value,
        alamat: document.getElementById("alamat").value,
      })
    });

    if (result.isConfirmed) {
      try {
        const token = getToken();
        await axios.post("http://localhost:8000/api/pembinas", result.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await fetchPembina();
        Swal.fire("Berhasil!", "Data pembina ditambahkan.", "success");
      } catch (error) {
        console.error("Gagal tambah pembina:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menambah pembina.", "error");
      }
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input className="bar-search" type="text" placeholder="Search . . ." />
          <button className="search-btn" type="search">GO</button>
          <button className="tambah-data-btn" onClick={handleTambahData}>
            <IoMdAdd />
          </button>
        </div>

        <div className="eskul-list">
          {pembinaList.length > 0 ? (
            pembinaList.map((p, index) => (
              <div key={index} className="eskul-item">
                <img src={p.icon} alt={p.name} className="eskul-icon" />
                <div className="eskul-info">
                  <h2>{p.name}</h2>
                </div>
                <div className="eskul-members">
                  <button className="hapus-data-btn" onClick={() => handleHapusPembina(p.id)}>
                    <FaRegTrashAlt />
                  </button>
                  <button className="arrow-btn" onClick={() => handleNavigate(p.id)}>
                    →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Belum ada pembina.</p>
            </div>
          )}
        </div>
        <BackButton />
      </div>
    </>
  );
}

export default DaftarPembinaAdmin;
