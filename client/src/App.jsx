import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Import pages
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

// Komponen untuk redirect berdasarkan role
const RedirectByRole = ({ role }) => {
  if (role === "admin") return <Navigate to="/dashboard/admin" />;
  if (role === "pembina") return <Navigate to="/dashboard/pembina" />;
  if (role === "siswa") return <Navigate to="/dashboard/siswa" />;
  return <Login />;
};

// Wrapper untuk guard dan scroll handling
const Wrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Control scroll overflow
    document.body.style.overflow =
      location.pathname === "/" ? "hidden" : "auto";

    // Guard: jika tidak di halaman login dan tidak ada token, redirect
    if (location.pathname !== "/" && !localStorage.getItem("token")) {
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
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setRole(null);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  }, []);

  if (loading) return null; // atau tampilkan loading spinner

  return (
    <Router>
      <Wrapper>
        <Routes>
          {/* Landing / Login + Redirect */}
          <Route path="/" element={<RedirectByRole role={role} />} />

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
