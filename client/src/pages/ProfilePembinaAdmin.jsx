import "./ProfilePembinaAdmin.css";
import Navbar from "../components/NavbarAdmin";
import PhotoUser from "../assets/user-profile.png";
import { BiSolidPencil } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Profile() {

  const handleEditData = () => {
    const result = MySwal.fire({
      html: `
            <div class="form-container">
              <img src="${PhotoUser}" alt="profile" class="profile-icon"/>
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
      confirmButtonText: "Confirm",
      showCloseButton: true,
      customClass: {
        popup: "tambah-data-popup",
        confirmButton: "confirm-btn",
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
          <h1 className="user-name-profile">HARYADI INDRAWIJAYA</h1>
          <div className="nis-nisn">
            <label className="nip" htmlFor="">
              NIP
            </label>
            <input
              className="nip-value-pembinaadmin"
              type="number"
              name=""
              value={544231000}
            />
            <label htmlFor="" className="tanggal-lahir-pembina">
              TANGGAL LAHIR
            </label>
            <input
              className="tanggal-lahir-value-pembina"
              type="date"
              name=""
              id=""
            />
            <label htmlFor="" className="alamat-pembina">
              ALAMAT
            </label>
            <input
              type="text"
              name=""
              id=""
              className="alamat-value-pembina"
              value="-"
            />
          </div>
          <button className="edit-data-btn" onClick={handleEditData}>
            <BiSolidPencil />
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
