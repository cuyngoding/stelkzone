import "./ProfileSiswaAdmin.css";
import Navbar from "../components/NavbarAdmin";
import PhotoUser from "../assets/user-profile.png";
import { BiSolidPencil } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Profile() {
  const handleEditData = () => {
      MySwal.fire({
        html: `
          <div class="form-container">
            <img src="${PhotoUser}" alt="profile" class="profile-icon"/>
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
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile">BACO ANDAYANA BIN BASO</h1>
          <div className="nis-nisn">
            <label className="nis" htmlFor="">
              NIS
            </label>
            <input className="nis-value-profilesiswaadmin" type="number" name="" id="nis" value={544231000} />  {/* value nya nanti dari tambah dan edit datanya */}
            <label className="nisn" htmlFor="">
              NISN
            </label>
            <input className="nisn-value" type="number" name="" id="nisn" value={123567890} />  {/* value nya nanti dari tambah dan edit datanya */}
            <label htmlFor="" className="tanggal-lahir">
              TANGGAL LAHIR
            </label>
            <input className="tanggal-lahir-value" type="date" name="" id="" />
            <label htmlFor="" className="alamat">
              ALAMAT
            </label>
            <input type="text" name="" id="" className="alamat-value" value="Jl. Serigala No.19" />  {/* value nya nanti dari tambah dan edit datanya */}
          </div>
          <button className="edit-data-btn" name="edit-data-siswa-btn" id="edit-data-siswa-btn" onClick={handleEditData}><BiSolidPencil/></button>
        </div>
      </div>
    </>
  );
}

export default Profile;
