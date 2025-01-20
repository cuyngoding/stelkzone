import Navbar from "../components/Navbar"
import SatryaRover from "../assets/satrya-rover.png";
import './Satrov.css'


function Satrov() {
  return (
    <>
    <Navbar />
    <img className="logo-eskul" src={SatryaRover} alt="" />
    <h1 className="nama-eskul">PRAMUKA (SATRYA ROVER)</h1>
    </>
  )
}

export default Satrov