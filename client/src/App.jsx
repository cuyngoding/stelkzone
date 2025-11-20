import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfilePembina from "./pages/ProfilePembina";
import ProfileSatrov from "./pages/Satrov";
import ProfileSatrovPembina from "./pages/SatrovPembina";
import ProfileSatrovAdmin from "./pages/SatrovAdmin";
import NotFound from "./pages/NotFound";
import EskulLainnya from "./pages/EskulLainnya";
import SatrovDaftar from "./pages/SatrovDaftar";
import DashboardPembina from "./pages/HomePembina";
import DashboardAdmin from "./pages/HomeAdmin";
import DaftarSiswaPembina from "./pages/DaftarSiswaPembina";
import DaftarSiswaAdmin from "./pages/DaftarSiswaAdmin";
import DaftarPembinaAdmin from "./pages/DaftarPembinaAdmin";
import ProfileAdmin from "./pages/ProfileAdmin";
import ProfileSiswaPembina from "./pages/ProfileSiswaPembina";
import ProfileSiswaAdmin from "./pages/ProfileSiswaAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePembinaAdmin from "./pages/ProfilePembinaAdmin";
import "./App.css";
// Redirect otomatis berdasarkan role
const RedirectByRole = ({ role }) => {
  if (role === "admin") return <Navigate to="/dashboard/admin" />;
  if (role === "pembina") return <Navigate to="/dashboard/pembina" />;
  if (role === "siswa") return <Navigate to="/dashboard/siswa" />;
  return <Login />;
};

RedirectByRole.propTypes = {
  role: PropTypes.string,
};

// Wrapper untuk mengatur scroll & redirect kalau belum login
const Wrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow =
      location.pathname === "/" ? "hidden" : "auto";

    if (location.pathname !== "/" && !localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return children;
};

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setRole(parsedUser.role);
      } catch {
        setRole(null);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<RedirectByRole role={role} />} />

          {/* Dashboard */}
          <Route
            path="/dashboard/siswa"
            element={
              <ProtectedRoute allowedRoles={["siswa"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pembina"
            element={
              <ProtectedRoute allowedRoles={["pembina"]}>
                <DashboardPembina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pembina/daftar-siswa"
            element={
              <ProtectedRoute allowedRoles={["pembina"]}>
                <DaftarSiswaPembina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/daftar-siswa"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DaftarSiswaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/daftar-pembina"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DaftarPembinaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile/siswa"
            element={
              <ProtectedRoute allowedRoles={["siswa"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/pembina"
            element={
              <ProtectedRoute allowedRoles={["pembina"]}>
                <ProfilePembina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProfileAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-siswa/:id/pembina"
            element={
              <ProtectedRoute allowedRoles={["pembina"]}>
                <ProfileSiswaPembina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-siswa-admin/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProfileSiswaAdmin />
              </ProtectedRoute>
            }
          />

          {/* Ekskul */}
          <Route path="/more-ekskul" element={<EskulLainnya />} />
          <Route
            path="/dashboard/siswa/Satrov/:id" 
            element={
              <ProtectedRoute allowedRoles={["siswa"]}>
                <ProfileSatrov />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pembina/profile-eskul/satryarover"
            element={
              <ProtectedRoute allowedRoles={["pembina"]}>
                <ProfileSatrovPembina />
              </ProtectedRoute>
            }
          />
          {/* tandai */}
          <Route
            path="/dashboard/admin/Satrov/:id" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProfileSatrovAdmin />
              </ProtectedRoute>
            }
          />

          {/* ✅ Route dinamis ke halaman daftar ekskul */}
          <Route
            path="/more-ekskul/daftar/:id"
            element={
              <ProtectedRoute allowedRoles={["siswa"]}>
                <SatrovDaftar />
              </ProtectedRoute>
            }
          />

          {/* Admin view pembina */}
          <Route
            path="/profile-pembina/admin/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProfilePembinaAdmin />
              </ProtectedRoute>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
