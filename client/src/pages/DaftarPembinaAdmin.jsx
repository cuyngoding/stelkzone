import { useNavigate } from "react-router-dom";
import './DaftarPembinaAdmin.css';
import PhotoProfile from "../assets/user-profile.png";
import NavbarAdmin from "../components/NavbarAdmin";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
function DaftarPembinaAdmin() {
  const navigate = useNavigate();

  const eskuls = [
    // munculkan data siswa di sini
    { name: "HARYADI INDRAWIJAYA", icon: PhotoProfile, route: "profile-pembina" },
    
  ];

  const handleNavigate = (route) => {
    navigate(`/${route}/admin`);
  };

  const handleTambahData = () => {

    const result = MySwal.fire({
      html: `
        <div class="form-container">
          <img src="${PhotoProfile}" alt="profile" class="profile-icon"/>
          <label for="nama">NAMA</label>
          <input id="nama" type="text" class="swal2-input" />
          <div style="display: flex;">
            <div style="flex: 1;">
              <label class="nis-label" for="nip">NIP</label>
              <input id="nip" type="text" class="swal2-input" />
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

  }

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
                <button className="hapus-data-btn">
                  <FaRegTrashAlt />
                </button>
                <button className="arrow-btn" onClick={() => handleNavigate(eskul.route)}>→</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DaftarPembinaAdmin;
