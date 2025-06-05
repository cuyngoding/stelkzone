import "./Profile.css";
import Navbar from "../components/NavbarAdmin";
import PhotoUser from "../assets/user-profile.png";
import { BiSolidPencil } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/auth";

const MySwal = withReactContent(Swal);

function ProfileSiswaAdmin() {
  const { id } = useParams(); // Ambil ID dari URL
  const [siswa, setSiswa] = useState({
  nama: "",
  nis: "",
  nisn: "",
  tanggal_lahir: "",
  alamat: "",
  kelas: "", // ✅ Tambahkan ini
});


  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`http://localhost:8000/api/siswas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        setSiswa({
  nama: data.nama,
  nis: data.nis,
  nisn: data.nisn,
  tanggal_lahir: data.tanggal_lahir,
  alamat: data.alamat,
  kelas: data.kelas, // ✅ Ambil dari response
});

      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      }
    };

    fetchSiswa();
  }, [id]);

  const handleEditData = () => {
    MySwal.fire({
      title: "Edit Data Siswa",
      html: `
        <div id="formEdit" class="form-container">
          <img src="${PhotoUser}" alt="profile" class="profile-icon"/>
          <label for="nama">NAMA</label>
          <input id="nama" type="text" class="swal2-input" value="${
            siswa.nama || ""
          }" />
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label for="nis">NIS</label>
              <input id="nis" type="text" class="swal2-input" value="${
                siswa.nis || ""
              }" />
            </div>
            <div style="flex: 1;">
              <label for="nisn">NISN</label>
              <input id="nisn" type="text" class="swal2-input" value="${
                siswa.nisn || ""
              }" />
            </div>
          </div>
          <label for="tgl">TANGGAL LAHIR</label>
          <input id="tgl" type="date" class="swal2-input" value="${
            formatTanggal(siswa.tanggal_lahir) || ""
          }" />
          <label for="kelas">KELAS</label>
          <input id="kelassiswa" type="text" class="swal2-input" value="${siswa.kelas || ''}"/>
          <label for="alamat">ALAMAT</label>
          <input id="alamat" type="text" class="swal2-input" value="${
            siswa.alamat || ""
          }" />
        </div>
      `,
      confirmButtonText: "Confirm",
      showCloseButton: true,
      customClass: {
        popup: "tambah-data-popup",
        confirmButton: "confirm-btn",
        title: "edit-data-title",
      },
      buttonsStyling: false,
      preConfirm: () => ({
      nama: document.getElementById("nama").value,
      nis: document.getElementById("nis").value,
      nisn: document.getElementById("nisn").value,
      tanggal_lahir: document.getElementById("tgl").value,
      alamat: document.getElementById("alamat").value,
      kelas: document.getElementById("kelassiswa").value, // ✅ Ambil dari input kelas
    })

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = getToken();
          await axios.put(
            `http://localhost:8000/api/siswas/${id}`,
            result.value,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSiswa((prev) => ({ ...prev, ...result.value }));
          Swal.fire("Berhasil!", "Data siswa berhasil diupdate.", "success");
        } catch (error) {
          console.error("Gagal update data siswa:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat update data.", "error");
        }
      }
    });
  };

  // Function bantu buat format tanggal
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const tgl = new Date(tanggal);
    return tgl.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="content-container">
          <img className="profile-photo" src={PhotoUser} alt="" />
          <h1 className="user-name-profile">{siswa.nama}</h1>
          <div className="nis-nisn">
            <label className="nis" htmlFor="">
              NIS
            </label>
            <input
              className="nis-value"
              type="number"
              value={siswa.nis || ""}
              readOnly
            />
            <label className="nisn" htmlFor="">
              NISN
            </label>
            <input
              className="nisn-value"
              type="number"
              id="nisn"
              value={siswa.nisn || ""}
              readOnly
            />
            <label htmlFor="" className="tanggal-lahir">
              TANGGAL LAHIR
            </label>
            <input
              className="tanggal-lahir-value"
              type="date"
              value={siswa.tanggal_lahir || ""}
              readOnly
            />
            <label className="kelas">KELAS</label>
            <input
            className="Kelas-value"
            type="text"
            id="kelas"
            value={siswa.kelas || ""}
            readOnly
          />

            <label htmlFor="" className="alamat">
              ALAMAT
            </label>
            <input
              type="text"
              className="alamat-value"
              value={siswa.alamat || ""}
              readOnly
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

export default ProfileSiswaAdmin;
