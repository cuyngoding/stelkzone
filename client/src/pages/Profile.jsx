import "./Profile.css"
import Navbar from "../components/Navbar"
import PhotoUser from "../assets/user-profile.png"

function Profile() {
  return (
    <>
    <div className="profile-page">

    <Navbar />
    <div className="content-container">
    <img className="profile-photo" src={PhotoUser} alt="" />
    <h1 className="user-name-profile">BACO ANDAYANA BIN BASO</h1>
    <div className="nis-nisn">
      <label className="nis" htmlFor="">NIS</label>
      <input className="nis-value" type="number" name="" id="nis" value={544231000} />
      <label className="nisn" htmlFor="">NISN</label>
      <input className="nisn-value" type="number" name="" id="nisn" value={1234567890} />
    </div>
    </div>
    </div>
    </>
  )
}

export default Profile