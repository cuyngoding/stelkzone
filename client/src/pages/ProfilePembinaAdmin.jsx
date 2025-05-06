import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfilePembinaAdmin.css";
import Navbar from "../components/NavbarAdmin";
import PhotoUser from "../assets/user-profile.png";
import { BiSolidPencil } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { getToken } from "../utils/auth"; // pastikan path ini benar

const MySwal = withReactContent(Swal);

function ProfilePembinaAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pembina, setPembina] = useState(null);

  const fetchPembina = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:8000/api/pembinas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPembina(res.data);
    } catch (err) {
      console.error("Gagal ambil data pembina", err);
      Swal.fire("Error", "Gagal memuat data pembina", "error");
    }
  };

  useEffect(() => {
    if (!id) {
      Swal.fire("Error", "ID pembina tidak ditemukan di URL", "error");
      navigate("/daftar-pembina-admin");
    } else {
      fetchPembina();
    }
  }, [id]);

  const handleEditData = async () => {
    const result = await MySwal.fire({
      title: 'Edit Data Pembina',
      html: `
        <div class="form-container">
          <img src="${PhotoUser}" alt="profile" class="profile-icon"/>
          <label for="nama">NAMA</label>
          <input id="nama" type="text" class="swal2-input" value="${pembina.nama}" />
          <label for="nip">NIP</label>
          <input id="nip" type="text" class="swal2-input" value="${pembina.nip || ''}" />
          <label for="tgl">TANGGAL LAHIR</label>
          <input id="tgl" type="date" class="swal2-input" value="${pembina.tanggal_lahir || ''}" />
          <label for="alamat">ALAMAT</label>
          <input id="alamat" type="text" class="swal2-input" value="${pembina.alamat || ''}" />
        </div>
      `,
      confirmButtonText: "Simpan",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nama: document.getElementById("nama").value,
          nip: document.getElementById("nip").value,
          tanggal_lahir: document.getElementById("tgl").value,
          alamat: document.getElementById("alamat").value,
        };
      },
    });

    if (result.isConfirmed) {
      try {
        const token = getToken();
        await axios.put(`http://localhost:8000/api/pembinas/${id}`, result.value, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        await fetchPembina();
        Swal.fire("Berhasil", "Data pembina diperbarui", "success");
      } catch (err) {
        console.error("Gagal update data:", err.response?.data || err.message);
        Swal.fire("Error", "Gagal memperbarui data", "error");
      }
    }
  };

  if (!pembina) return <p>Memuat data...</p>;

  return (
    <div className="profile-page">
      <Navbar />
      <div className="content-container">
        <img className="profile-photo" src={PhotoUser} alt={pembina.nama} />
        <h1 className="user-name-profile">{pembina.nama}</h1>
        <div className="nis-nisn">
          <label className="nip">NIP</label>
          <input className="nip-value-pembinaadmin" type="text" value={pembina.nip || ""} readOnly />
          <label className="tanggal-lahir-pembina">TANGGAL LAHIR</label>
          <input className="tanggal-lahir-value-pembina" type="date" value={pembina.tanggal_lahir || ""} readOnly />
          <label className="alamat-pembina">ALAMAT</label>
          <input className="alamat-value-pembina" type="text" value={pembina.alamat || ""} readOnly />
        </div>
        <button className="edit-data-btn" onClick={handleEditData}>
          <BiSolidPencil />
        </button>
      </div>
    </div>
  );
}

export default ProfilePembinaAdmin;
