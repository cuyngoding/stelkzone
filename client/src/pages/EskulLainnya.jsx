import './EskulLainnya.css';
import Navbar from "../components/Navbar";
import SatryaRover from "../assets/satrya-rover.png";
import WebTech from "../assets/web-tech.png";
import Capture from "../assets/capture.png";
import Gradasi from "../assets/gradasi.png";
import Pastelk from "../assets/pastelk.png";
import Elips from "../assets/elips.png";
import Ikramtel from "../assets/ikramtel.png";
import Komers from "../assets/komers.png";

function EskulLainnya() {
  const eskuls = [
    { name: "SATRYA ROVER (PRAMUKA)", icon: SatryaRover, days: "JUMAT", members: 13 },
    { name: "PASKIBRA STELK (PASTELK)", icon: Pastelk, days: "JUMAT, SABTU", members: 20 },
    { name: "MENGGAMBAR (GRADASI)", icon: Gradasi, days: "JUMAT", members: 12 },
    { name: "FOTOGRAFI (CAPTURE)", icon: Capture, days: "JUMAT", members: 9 },
    { name: "ROBOTIK (ELIPS)", icon: Elips, days: "JUMAT", members: 15 },
    { name: "REKAYASA WEB (WEB TECHNOLOGY)", icon: WebTech, days: "JUMAT", members: 10 },
    { name: "ISLAMI (IKRAMTEL)", icon: Ikramtel, days: "JUMAT", members: 13 },
    { name: "JURNALISTIK (KOMERS)", icon: Komers, days: "JUMAT", members: 13 },
  ];

  return (
    <>
      <Navbar />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input
            className="bar-search"
            type="text"
            placeholder="Search . . ."
          />
          <button className='search-btn' type="search">
            GO
          </button>
        </div>

        <div className="eskul-list">
          {eskuls.map((eskul, index) => (
            <div key={index} className="eskul-item">
              <img src={eskul.icon} alt={eskul.name} className='eskul-icon' />
              <div className="eskul-info">
                <h2>{eskul.name}</h2>
                <p>Hari: {eskul.days}</p>
              </div>
              <div className="eskul-members">
                <span>Jumlah: {eskul.members}</span>
                <button className="arrow-btn">→</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EskulLainnya;