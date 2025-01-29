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
    <h1 className="user-name-profile">Nama User</h1>

    <div className="nis-nisn">
      <label className="nis" htmlFor="">NIS</label>
      <br />
      <input className="nis-value" type="number" name="" id="" value={544231000} />
      <label className="nisn" htmlFor="">NISN</label>
      <br />
      <input className="nisn-value" type="number" name="" id="" />
    </div>
     
    </div>
    
    </div>
    </>
  )
}

export default Profile