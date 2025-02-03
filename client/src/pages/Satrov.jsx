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
    <h3 className="desc-label-eskul">Description</h3>
    <p className="desc-eskul">Ekstrakurikuler Pramuka Ambalan SATRYA ROVER di SMK Telkom Makassar mengembangkan kepemimpinan, kedisiplinan, dan kebersamaan melalui latihan rutin, perkemahan, dan program yang membentuk karakter serta keterampilan anggota untuk menghadapi tantangan.</p>
    <div className="structure-satrov">
      <label htmlFor=""className="pembina-pa pembina">Pembina Putra</label>
      <input className="pembina-pa-value value-satrov" type="text" name="" id="" value="Haryadi Indrawijaya, S.Pd." />
      <label htmlFor=""className="pembina-pi pembina">Pembina Putri</label>
      <input className="pembina-pi-value value-satrov" type="text" name="" id="" value="Yayu Aprilika Yunus, S.Si." />
      <label className="ketua-pa ketua" htmlFor="">Ketua Putra</label>
      <input className="value-satrov" type="text" name="" id="" value="Arthawan Pratama Pakurimba Azzuhud" />
      <label className="ketua-pi ketua" htmlFor="">Ketua Putri</label>
      <input className="value-satrov" type="text" name="" id="" value="Siti Khadija Sukardi" />
      </div>
    </div>
    </>
  )
}

export default Satrov