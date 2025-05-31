import "./ProfilePembina.css";
import Navbar from "../components/NavbarPembina";
import PhotoUser from "../assets/user-profile.png";
import BackButton from "../components/ButtonBack";

function Profile() {
  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile">HARYADI INDRAWIJAYA</h1>
          <div className="nis-nisn">
            <label className="nip" htmlFor="">
              NIP
            </label>
            <input className="nip-value" type="number" name=""  value={544231000} />
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
        <BackButton />
      </div>
    </>
  );
}

export default Profile;
