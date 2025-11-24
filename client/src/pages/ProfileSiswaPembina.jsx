import "./Profile.css";
import Navbar from "../components/NavbarPembina";
import PhotoUser from "../assets/user-profile.png";


function Profile() {
  const siswa = { kelas: "" };

  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile">BACO ANDAYANA BIN BASO</h1>
          <div className="nis-nisn">
            <label className="nis" htmlFor="">
              NIS
            </label>
            <input className="nis-value" type="number" name=""  value={544231000} />
            <label className="nisn" htmlFor="">
              NISN
            </label>
            <input className="nisn-value" type="number" name="" id="nisn" value={123567890} />
            <label htmlFor="" className="tanggal-lahir">
              TANGGAL LAHIR
            </label>
            <input className="tanggal-lahir-value" type="date" name="" id="" />
             <label className="kelas">KELAS</label>
          <input className="Kelas-value" id="kelas" type="text" value={siswa.kelas || ""} readOnly />
            <label htmlFor="" className="alamat">
              ALAMAT
            </label>
            <input type="text" name="" id="" className="alamat-value" value="Jl. Serigala No.19" />
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Profile;
