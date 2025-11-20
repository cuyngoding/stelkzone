import NavbarAdmin from "../components/NavbarAdmin";
import SatryaRover from "../assets/satrya-rover.png";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import PhotoProfile from "../assets/user-profile.png";
import BackButton from "../components/ButtonBack";
import Swal from "sweetalert2";
import './Satrov.css';

function Satrov() {
  const handleTambahData = () => {
    Swal.fire({
      title: 'Tambah Data Anggota',
      html: `
       <div class="form-container">
          <label for="nama">Nama</label>
          <input type="text" id="nama" class="swal2-input">
          <label for="jabatan">JABATAN</label>
          <select id="jabatan" class="swal2-input">
          <option value="">Pilih Jabatan</option>
          <option value="Anggota">Anggota</option>
          <option value="Ketua Putra">Pembina putra</option>
          <option value="Ketua Putra">Pembina putri</option>
          <option value="Ketua Putra">Ketua putra</option>
          <option value="Ketua Putri">Ketua putri</option>
          </select>
        </div>
    `,
    confirmButtonText: "Confirm",
    showCloseButton: true,
    customClass: {
      title: "edit-data-title",
      popup: "tambah-data-popup",
      confirmButton: "confirm-btn",
        },
      preConfirm: () => {
        const nama = document.getElementById('nama').value;
        const nis = document.getElementById('nis').value;
        // Simpan data ke server atau lakukan aksi lain di sini
      }
    });
  };
  return (
    <>
    <div className="satrov-page">
    <NavbarAdmin />
    <img className="logo-eskul" src={SatryaRover} alt="" />
    <h1 className="nama-eskul">PRAMUKA (SATRYA ROVER)</h1>

    <div className="satrov-container">
      <div>
        <h3 className="desc-label-eskul">Description</h3>
        <p className="desc-eskul">Ekstrakurikuler Pramuka Ambalan SATRYA ROVER di SMK Telkom Makassar mengembangkan kepemimpinan, kedisiplinan, dan kebersamaan melalui latihan rutin, perkemahan, dan program yang membentuk karakter serta keterampilan anggota untuk menghadapi tantangan.</p>
      </div>
      <div className="structure-satrov">
       <label htmlFor=""className="pembina-pa pembina">Pembina Putra</label>
       <input className="pembina-pa-value value-satrov" type="text" name="" id="" value=" Haryadi Indrawijaya" />
       <label htmlFor=""className="pembina-pi pembina">Pembina Putri</label>
       <input className="pembina-pi-value value-satrov" type="text" name="" id="" value=" Yayu Aprilika Yunus" />
       <label className="ketua-pa ketua" htmlFor="">Ketua Putra</label>
       <input className="value-satrov" type="text" name="" id="" value=" Arthawan Pratama Pakurimba Azzuhud" />
       <label className="ketua-pi ketua" htmlFor="">Ketua Putri</label>
       <input className="value-satrov" type="text" name="" id="" value=" Siti Khadija Sukardi" />
      </div>
    </div>

    {/* Anggota section: berada di luar satrov-container supaya tabel center full-width seperti siswa */}
    <div className="anggota-section" style={{ width: "100%", marginTop: "1rem" }}>
      <h1 className="header-daftar-anggota">Anggota</h1>
      <table className="table-anggota">
        <thead>
          <tr className="table-header">
            <th className="table-header-item">Nama</th>
            <th className="table-header-item">NIS</th>
            <th className="table-header-item">KELAS</th>
            <th className="table-header-item">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-row-item">BACO ANDAYANA BIN BASO</td>
            <td className="table-row-item">544231000</td>
            <td className="table-row-item">XI RPL 1</td>
            <td className="table-row-item action">
              <button className="btn-edit"><BiSolidPencil/></button>
              <button className="btn-delete"><FaTrash/></button>
            </td>

          </tr>
          <tr className="table-row">
            <td className="table-row-item">ARTHAWAN PRATAMA PAKURIMBA AZZUHUD</td>
            <td className="table-row-item">544231001</td>
            <td className="table-row-item">XI RPL 4</td>
            <td className="table-row-item action">
              <button className="btn-edit"><BiSolidPencil/></button>
              <button className="btn-delete"><FaTrash/></button>  
            </td>
          </tr>
        </tbody>
      </table>
      <button className="edit-data-btn" onClick={handleTambahData}>
        <MdOutlineAdd className="addicon" />
      </button>
    </div>
    <BackButton />
    </div>
    </>
  )
}

export default Satrov