import { Link } from "react-router-dom";
import "./NotFound.css"; // Impor file CSS

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/dashboard/siswa" className="not-found-link">Kembali ke Beranda</Link>
    </div>
  );
};

export default NotFound;
