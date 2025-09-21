import { useNavigate } from "react-router-dom";
import "./DaftarSiswaPembina.css";
import PhotoProfile from "../assets/user-profile.png";
import NavbarPembina from "../components/NavbarPembina";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import BackButton from "../components/ButtonBack";
import axios from "axios";
import { getToken } from "../utils/auth";

const MySwal = withReactContent(Swal);

function DaftarSiswaPembina() {
  const navigate = useNavigate();
  const [siswaList, setSiswaList] = useState([]);
  const [inputNis, setInputNis] = useState("");
  const [searchNis, setSearchNis] = useState("");

const fetchSiswa = async () => {
  const token = getToken();
  console.log("TOKEN:", token);

  try {
    const res = await fetch(`http://localhost:8000/api/siswas?search=${searchNis}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("DATA:", data);

    if (!res.ok) throw new Error("Fetch gagal");

    const siswaData = data.map((s) => ({
      id: s.id,
      name: s.nama,
      nis: s.nis,
      icon: PhotoProfile,
    }));

    setSiswaList(siswaData);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    setSiswaList([]);
  }
};


  const handleNavigate = (id) => {
    navigate(`/profile-siswa/${id}`);
  };

  const handleHapusSiswa = async (id) => {
    const konfirmasi = await MySwal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data siswa akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (konfirmasi.isConfirmed) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8000/api/siswas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSiswaList((prevList) => prevList.filter((siswa) => siswa.id !== id));
        Swal.fire("Terhapus!", "Data siswa berhasil dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus siswa:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };

  const handleSearchClick = () => {
    setSearchNis(inputNis);
  };

  const handleTambahData = async () => {
    const pilihan = await MySwal.fire({
      title: "Pilih Metode Penambahan",
      icon: "warning",
      showDenyButton: true,
      showCloseButton: true,
      confirmButtonText: "Input Manual",
      denyButtonText: "Upload Excel",
    });

    if (pilihan.isConfirmed) {
      const result = await MySwal.fire({
        html: `
          <div class="form-container">
            <img src="${PhotoProfile}" alt="profile" class="profile-icon"/>
            <label for="nama">NAMA</label>
            <input id="nama" type="text" class="swal2-input" />
            <div style="display: flex; gap: 10px;">
              <div style="flex: 1;">
                <label for="nis">NIS</label>
                <input id="nis" type="text" class="swal2-input" />
              </div>
              <div style="flex: 1;">
                <label for="nisn">NISN</label>
                <input id="nisn" type="text" class="swal2-input" />
              </div>
            </div>
            <label for="tgl">TANGGAL LAHIR</label>
            <input id="tgl" type="date" class="swal2-input" />
            <label for="kelas">KELAS</label>
            <input id="kelassiswa" type="text" class="swal2-input"/>
            <label for="alamat">ALAMAT</label>
            <input id="alamat" type="text" class="swal2-input" />
          </div>
        `,
        confirmButtonText: "Confirm",
        preConfirm: () => ({
          nama: document.getElementById("nama").value,
          nis: document.getElementById("nis").value,
          nisn: document.getElementById("nisn").value,
          tanggal_lahir: document.getElementById("tgl").value,
          alamat: document.getElementById("alamat").value,
          kelas: document.getElementById("kelassiswa").value,
        }),
      });

      if (result.isConfirmed) {
        try {
          const token = getToken();
          await axios.post("http://localhost:8000/api/siswas", result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchSiswa();
          Swal.fire("Berhasil!", "Data siswa ditambahkan.", "success");
        } catch (error) {
          console.error("Gagal tambah siswa:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat menambah siswa.", "error");
        }
      }
    } else if (pilihan.isDenied) {
      const result = await MySwal.fire({
        title: "Upload File Excel",
        html: `<input type="file" id="excelFile" class="swal2-file" accept=".xlsx,.xls" />`,
        confirmButtonText: "Upload",
        preConfirm: () => {
          const file = document.getElementById("excelFile").files[0];
          if (!file) {
            Swal.showValidationMessage("Pilih file terlebih dahulu.");
            return false;
          }
          return file;
        },
      });

      if (result.isConfirmed && result.value) {
        const formData = new FormData();
        formData.append("file", result.value);

        try {
          const token = getToken();
          await axios.post("http://localhost:8000/api/siswas/import", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          await fetchSiswa();
          Swal.fire("Berhasil!", "File Excel berhasil diimport.", "success");
        } catch (error) {
          console.error("Gagal import:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat mengunggah file.", "error");
        }
      }
    }
  };

  return (
    <>
      <NavbarPembina />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input
            className="bar-search"
            type="text"
            placeholder="Cari berdasarkan NIS..."
            value={inputNis}
            onChange={(e) => setInputNis(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearchClick}>GO</button>
        </div>

        <div className="eskul-list">
          {siswaList.length > 0 ? (
            siswaList.map((siswa) => (
              <div key={siswa.id} className="eskul-item">
                <img src={siswa.icon} alt={siswa.name} className="eskul-icon" />
                <div className="eskul-info">
                  <h2>{siswa.name}</h2>
                  <p>{siswa.nis}</p>
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
        <BackButton />
      </div>
    </>
  );
}

export default DaftarSiswaPembina;
