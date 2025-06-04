import { useEffect } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import PhotoUser from "../assets/user-profile.png";
import BackButton from "../components/ButtonBack";

function Profile() {
  

  return (
    <div className="profile-page">
      <Navbar />
      <div className="content-container">
        <img className="profile-photo" src={PhotoUser} alt="User" />
        <h1 className="user-name-profile">BACO ANDAYANA BIN BASO</h1>
        <div className="nis-nisn">
          <label className="nis">NIS</label>
          <input className="nis-value" type="number" value={544231000} readOnly />
          <label className="nisn">NISN</label>
          <input className="nisn-value" type="number" value={123567890} readOnly />
          <label className="tanggal-lahir">TANGGAL LAHIR</label>
          <input className="tanggal-lahir-value" type="date" />
          <label className="kelas">KELAS</label>
          <input className="Kelas-value" type="text" id="kelas" value={"X RPL 1"} readOnly />
          <label className="alamat">ALAMAT</label>
          <input className="alamat-value" type="text" value="Jl. Serigala No.19" readOnly />
        </div>
      </div>
      <BackButton />
    </div>
  );
}

export default Profile;
