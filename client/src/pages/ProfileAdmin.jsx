import "./ProfileAdmin.css";
import Navbar from "../components/NavbarAdmin";
import PhotoUser from "../assets/user-profile.png";

function Profile() {
  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile-admin">ADMIN STELK</h1>
          <div className="nis-nisn">
            <label className="nip" htmlFor="">
              NIP
            </label>
            <input className="nip-value" type="number" name=""  value={1111111} />
            <label htmlFor="" className="tanggal-lahir-pembina">
              TANGGAL LAHIR
            </label>
            <input className="tanggal-lahir-value-pembina" type="date" name="" id="" />
            <label htmlFor="" className="alamat-pembina">
              ALAMAT
            </label>
            <input type="text" name="" id="" className="alamat-value-pembina" value="-" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
