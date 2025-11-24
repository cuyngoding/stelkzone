import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import NavbarAdmin from "../components/NavbarAdmin";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { getToken } from "../utils/auth";
import PhotoProfile from "../assets/user-profile.png";

const MySwal = withReactContent(Swal);

function DaftarPembinaAdmin() {
  const navigate = useNavigate();
  const [pembinaList, setPembinaList] = useState([]);
  const [searchNip, setSearchNip] = useState("");
  const [queryNip, setQueryNip] = useState(""); // nilai untuk trigger pencarian

  const fetchPembina = useCallback(async () => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:8000/api/pembinas?search=${queryNip}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const pembinaData = res.data.map((p) => ({
        id: p.id,
        name: p.nama,
        nip: p.nip,
        icon: PhotoProfile,
      }));

      setPembinaList(pembinaData);
    } catch (error) {
      console.error("Error saat fetch pembina:", error);
      setPembinaList([]);
    }
  }, [queryNip]);

  useEffect(() => {
    fetchPembina();
  }, [fetchPembina]);

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
      cancelButtonText: "Batal",
    });

    if (konfirmasi.isConfirmed) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8000/api/pembinas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPembinaList((prev) => prev.filter((p) => p.id !== id));
        Swal.fire("Terhapus!", "Data pembina berhasil dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus pembina:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };

  const handleTambahData = async () => {
    const metode = await MySwal.fire({
      icon: "warning",
      title: "Pilih Metode Input",
      showDenyButton: true,
      confirmButtonText: "Input Manual",
      denyButtonText: "Upload Excel",
      showCloseButton: true,
    });

    if (metode.isConfirmed) {
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
        confirmButtonText: 'Tambah',
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
            headers: { Authorization: `Bearer ${token}` },
          });

          await fetchPembina();
          Swal.fire("Berhasil!", "Data pembina ditambahkan.", "success");
        } catch (error) {
          console.error("Gagal tambah pembina:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat menambah pembina.", "error");
        }
      }
    } else if (metode.isDenied) {
      Swal.fire({
        title: 'Upload File Excel',
        html: `<input type="file" id="excelFile" class="swal2-file" accept=".xlsx, .xls" />`,
        confirmButtonText: 'Upload',
        showCancelButton: true,
        preConfirm: async () => {
          const fileInput = document.getElementById('excelFile');
          if (!fileInput.files.length) {
            Swal.showValidationMessage("Pilih file Excel terlebih dahulu");
            return false;
          }

          const formData = new FormData();
          formData.append('file', fileInput.files[0]);

          try {
            const token = getToken();
            await axios.post("http://localhost:8000/api/pembinas/import", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
              },
            });

            await fetchPembina();
            Swal.fire("Berhasil!", "Data pembina berhasil diimport.", "success");
          } catch (error) {
            console.error("Gagal import file:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat import Excel.", "error");
          }
        }
      });
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input
            className="bar-search"
            type="text"
            placeholder="Cari..."
            value={searchNip}
            onChange={(e) => setSearchNip(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => setQueryNip(searchNip)}
          >
            GO
          </button>
          <button className="tambah-data-btn" onClick={handleTambahData}>
            <IoMdAdd />
          </button>
        </div>

        <div className="eskul-list">
          {pembinaList.length > 0 ? (
            pembinaList.map((pembina) => (
              <div key={pembina.id} className="eskul-item">
                <img src={pembina.icon} alt={pembina.name} className="eskul-icon" />
                <div className="eskul-info">
                  <h2>{pembina.name}</h2>
                  <p>{pembina.nip}</p>
                </div>
                <div className="eskul-members">
                  <button className="hapus-data-btn" onClick={() => handleHapusPembina(pembina.id)}>
                    <FaRegTrashAlt />
                  </button>
                  <button className="arrow-btn" onClick={() => handleNavigate(pembina.id)}>
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
      </div>
    </>
  );
}

export default DaftarPembinaAdmin;
