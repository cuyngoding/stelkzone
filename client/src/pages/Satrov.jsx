import Navbar from "../components/Navbar"
import SatryaRover from "../assets/satrya-rover.png";
import './Satrov.css'

function Satrov() {
  return (
    <>
    <div className="satrov-page">
    <Navbar />
    <img className="logo-eskul" src={SatryaRover} alt="" />
    <h1 className="nama-eskul">PRAMUKA (SATRYA ROVER)</h1>
    <h4 className="desc-label-eskul">Description</h4>
    </div>
    </>
  )
}

export default Satrov