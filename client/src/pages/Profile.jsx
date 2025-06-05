import { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import PhotoUser from "../assets/user-profile.png";
import BackButton from "../components/ButtonBack";
import axios from "axios";
import { getToken } from "../utils/auth";

function Profile() {
  const [siswa, setSiswa] = useState({
    nama: "",
    nis: "",
    nisn: "",
    tanggal_lahir: "",
    alamat: "",
    kelas: "",
  });

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8000/api/siswa/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setSiswa({
          nama: data.nama,
          nis: data.nis,
          nisn: data.nisn,
          tanggal_lahir: data.tanggal_lahir,
          alamat: data.alamat,
          kelas: data.kelas,
        });
      } catch (err) {
        console.error("Gagal mengambil data profil siswa:", err);
      }
    };

    fetchSiswa();
  }, []);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const tgl = new Date(tanggal);
    return tgl.toISOString().split("T")[0];
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="content-container">
        <img className="profile-photo" src={PhotoUser} alt="User" />
        <h1 className="user-name-profile">{siswa.nama}</h1>
        <div className="nis-nisn">
          <label className="nis">NIS</label>
          <input className="nis-value" type="number" value={siswa.nis || ""} readOnly />
          <label className="nisn">NISN</label>
          <input className="nisn-value" type="number" value={siswa.nisn || ""} readOnly />
          <label className="tanggal-lahir">TANGGAL LAHIR</label>
          <input
            className="tanggal-lahir-value"
            type="date"
            value={formatTanggal(siswa.tanggal_lahir)}
            readOnly
          />
          <label className="kelas">KELAS</label>
          <input className="Kelas-value" type="text" value={siswa.kelas || ""} readOnly />
          <label className="alamat">ALAMAT</label>
          <input className="alamat-value" type="text" value={siswa.alamat || ""} readOnly />
        </div>
      </div>
      <BackButton />
    </div>
  );
}

export default Profile;
