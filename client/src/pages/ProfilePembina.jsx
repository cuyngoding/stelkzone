import { useEffect, useState } from "react";
import "./ProfilePembina.css";
import Navbar from "../components/NavbarPembina";
import PhotoUser from "../assets/user-profile.png";
import BackButton from "../components/ButtonBack";
import axios from "axios";
import { getToken } from "../utils/auth";

function Profile() {
  const [pembina, setPembina] = useState({
    nama: "",
    nip: "",
    tanggal_lahir: "",
    alamat: "",
  });

  useEffect(() => {
    const fetchPembina = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8000/api/pembina/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPembina(res.data);
      } catch (err) {
        console.error("Gagal mengambil data profil pembina:", err);
      }
    };

    fetchPembina();
  }, []);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const tgl = new Date(tanggal);
    return tgl.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile">{pembina.nama}</h1>
          <div className="info-profile">
            <label className="nip" htmlFor="">
              NIP
            </label>
            <input
              className="nip-value"
              type="number"
              value={pembina.nip || ""}
              readOnly
            />
            <label htmlFor="" className="tanggal-lahir-pembina">
              TANGGAL LAHIR
            </label>
            <input
              className="tanggal-lahir-value-pembina"
              type="date"
              value={formatTanggal(pembina.tanggal_lahir)}
              readOnly
            />
            <label htmlFor="" className="alamat-pembina">
              ALAMAT
            </label>
            <input
              type="text"
              className="alamat-value-pembina"
              value={pembina.alamat || ""}
              readOnly
            />
          </div>
        </div>
        <BackButton />
      </div>
    </>
  );
}

export default Profile;
