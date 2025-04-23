import { useNavigate } from "react-router-dom";
import './DaftarSiswaAdmin.css';
import PhotoProfile from "../assets/user-profile.png";
import NavbarAdmin from "../components/NavbarAdmin";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DaftarSiswaAdmin() {
  const navigate = useNavigate();

  const eskuls = [
    { name: "BACO ANDAYANA BIN BASO", icon: PhotoProfile, route: "profile-siswa" },
    { name: "ARTHAWAN PRATAMA PAKURIMBA AZZUHUD", icon: PhotoProfile, route: "#" },
    { name: "ALDRIN FABIO LEIMENA", icon: PhotoProfile, route: "#" },
    { name: "CHRISTIAN BAGASKARA", icon: PhotoProfile, route: "#" },
    { name: "MUHAMMAD ALIF AL FATH", icon: PhotoProfile, route: "#" },
    { name: "MUHAMMAD DZAKI HASYIM", icon: PhotoProfile, route: "#" },
  ];

  const handleNavigate = (route) => {
    navigate(`/${route}/admin`);
  };

  const handleTambahData = () => {
    MySwal.fire({
      html: `
        <div class="form-container">
          <img src="${PhotoProfile}" alt="profile" class="profile-icon"/>
          <label for="nama">NAMA</label>
          <input id="nama" type="text" class="swal2-input" />
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label class="nis-label" for="nis">NIS</label>
              <input id="nis" type="text" class="swal2-input" />
            </div>
            <div style="flex: 1;">
              <label class="nisn-label" for="nisn">NISN</label>
              <input id="nisn" type="text" class="swal2-input" />
            </div>
          </div>
          <label class="tgl-label" for="tgl">TANGGAL LAHIR</label>
          <input id="tgl" type="date" class="swal2-input" />
          <label class="alamat-label" for="alamat">ALAMAT</label>
          <input id="alamat" type="text" class="swal2-input" />
        </div>
      `,
      confirmButtonText: 'Confirm',
      showCloseButton: true,
      customClass: {
        popup: 'tambah-data-popup',
        confirmButton: 'confirm-btn',
      },
      buttonsStyling: false,
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="ekskulLainnya-page">
        <div className="search-container">
          <input className="bar-search" type="text" placeholder="Search . . ." />
          <button className='search-btn' type="search">GO</button>
          <button className="tambah-data-btn" onClick={handleTambahData}>
            <IoMdAdd />
          </button>
        </div>

        <div className="eskul-list">
          {eskuls.map((eskul, index) => (
            <div key={index} className="eskul-item">
              <img src={eskul.icon} alt={eskul.name} className='eskul-icon' />
              <div className="eskul-info">
                <h2>{eskul.name}</h2>
              </div>
              <div className="eskul-members">
                <button className="hapus-data-btn"><FaRegTrashAlt /></button>
                <button className="arrow-btn" onClick={() => handleNavigate(eskul.route)}>→</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DaftarSiswaAdmin;
