import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate(); // ini buat navigasi bro

  useEffect(() => {
    console.log("%cError 404 Not Found", "color: red; font-weight: bold;");
  }, []);

  const handleBack = () => {
    navigate(-1); // ini buat balik ke halaman sebelumnya
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Halaman yang kamu cari tidak ditemukan.</p>
      <button onClick={handleBack} className="not-found-link">
        Kembali ke Halaman Sebelumnya
      </button>
    </div>
  );
};

export default NotFound;
