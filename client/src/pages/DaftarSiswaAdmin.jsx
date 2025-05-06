import { useNavigate } from "react-router-dom";
import './DaftarSiswaAdmin.css';
import PhotoProfile from "../assets/user-profile.png";
import NavbarAdmin from "../components/NavbarAdmin";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const MySwal = withReactContent(Swal);

function DaftarSiswaAdmin() {
  const navigate = useNavigate();
  const [siswaList, setSiswaList] = useState([]);

  const fetchSiswa = async () => {
    const token = getToken();
    try {
      const res = await fetch("http://localhost:8000/api/siswas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal mengambil data siswa");

      const data = await res.json();
      const siswaData = data.map((s) => ({
        id: s.id,
        name: s.nama,
        icon: PhotoProfile,
        route: "#",
      }));

      setSiswaList(siswaData);
    } catch (error) {
      console.error("Error saat fetch data:", error);
      setSiswaList([]);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/profile-siswa-admin/${id}`);
  };
  

  const handleHapusSiswa = async (id) => {
    const konfirmasi = await MySwal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data siswa akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    });

    if (konfirmasi.isConfirmed) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8000/api/siswas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSiswaList((prevList) => prevList.filter((siswa) => siswa.id !== id));
        Swal.fire("Terhapus!", "Data siswa berhasil dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus siswa:", error);
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
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label class="nis-label" for="nis">NIS</label>
              <input id="nis" type="text" class="swal2-input" />
            </div>
            <div style="flex: 1;">
              <label class="nisn-label" for="nisn">NISN</label>
              <input id="nisn" type="text" class="swal2-input" />
            </div>
          </div>
          <label class="tgl-label" for="tgl">TANGGAL LAHIR</label>
          <input id="tgl" type="date" class="swal2-input" />
          <label class="alamat-label" for="alamat">ALAMAT</label>
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
        nis: document.getElementById("nis").value,
        nisn: document.getElementById("nisn").value,
        tanggal_lahir: document.getElementById("tgl").value,
        alamat: document.getElementById("alamat").value,
      })
    });

    if (result.isConfirmed) {
      try {
        const token = getToken();
        await axios.post("http://localhost:8000/api/siswas", result.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await fetchSiswa();
        Swal.fire("Berhasil!", "Data siswa ditambahkan.", "success");
      } catch (error) {
        console.error("Gagal tambah siswa:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menambah siswa.", "error");
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
  {siswaList.length > 0 ? (
    siswaList.map((siswa, index) => (
      <div key={index} className="eskul-item">
        <img src={siswa.icon} alt={siswa.name} className="eskul-icon" />
        <div className="eskul-info">
          <h2>{siswa.name}</h2>
        </div>
        <div className="eskul-members">
          <button className="hapus-data-btn" onClick={() => handleHapusSiswa(siswa.id)}>
            <FaRegTrashAlt />
          </button>
          <button className="arrow-btn" onClick={() => handleNavigate(siswa.id)}>

            →
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="empty-state">
      <p>Belum ada siswa.</p>
    </div>
  )}
</div>
      </div>
    </>
  );
}

export default DaftarSiswaAdmin;
