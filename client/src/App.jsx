import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,          // ← ditambahkan
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfilePembina from "./pages/ProfilePembina";
import ProfileSatrov from "./pages/Satrov";
import ProfileSatrovPembina from "./pages/SatrovPembina";
import NotFound from "./pages/NotFound";
import EskulLainnya from "./pages/EskulLainnya";
import SatrovDaftar from "./pages/SatrovDaftar";
import DashboardPembina from "./pages/HomePembina";
import DashboardAdmin from "./pages/HomeAdmin";
import DaftarSiswaPembina from "./pages/DaftarSiswaPembina";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();               // ← ditambahkan

    useEffect(() => {
      document.body.style.overflow =
        location.pathname === "/" ? "hidden" : "auto";

      // ← SIMPLE GUARD: kalau bukan halaman login dan token hilang, redirect ke "/"
      if (location.pathname !== "/" && !localStorage.getItem("token")) {
        navigate("/", { replace: true });
      }
    }, [location, navigate]);

    return children;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setRole(parsedUser.role);
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route
            path="/"
            element={
              role === "admin" ? (
                <Navigate to="/dashboard/admin" />
              ) : role === "pembina" ? (
                <Navigate to="/dashboard/pembina" />
              ) : role === "siswa" ? (
                <Navigate to="/dashboard/siswa" />
              ) : (
                <Login />
              )
            }
          />

          {/* DASHBOARD ROUTES */}
          <Route path="/dashboard/siswa" element={<Home />} />
          <Route path="/dashboard/pembina" element={<DashboardPembina />} />
          <Route
            path="/dashboard/pembina/daftar-siswa"
            element={<DaftarSiswaPembina />}
          />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />

          {/* PROFILE ROUTES */}
          <Route path="/profile/siswa" element={<Profile />} />
          <Route path="/profile/pembina" element={<ProfilePembina />} />

          {/* ESKUL ROUTES */}
          <Route path="/more-ekskul" element={<EskulLainnya />} />
          <Route
            path="/dashboard/siswa/profile-eskul/satryarover"
            element={<ProfileSatrov />}
          />
          <Route
            path="/dashboard/pembina/profile-eskul/satryarover"
            element={<ProfileSatrovPembina />}
          />
          <Route
            path="/more-ekskul/daftar/satryarover"
            element={<SatrovDaftar />}
          />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
