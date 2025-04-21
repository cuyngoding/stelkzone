import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfilePembina from './pages/ProfilePembina';
import ProfileSatrov from './pages/Satrov';
import ProfileSatrovPembina from './pages/SatrovPembina';
import './App.css';
import NotFound from './pages/NotFound';
import EskulLainnya from './pages/EskulLainnya';
import SatrovDaftar from './pages/SatrovDaftar';
import DashboardPembina from './pages/HomePembina';
import DashboardAdmin from './pages/HomeAdmin';
import DaftarSiswaPembina from './pages/DaftarSiswaPembina'
// import PrivateRoute from './utils/PrivateRoute'

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') {
        document.body.style.overflow = 'hidden'; 
      } else {
        document.body.style.overflow = 'auto'; 
      }
    }, [location]);

    return children;
  };

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<PrivateRoute />}></Route> */}
          <Route path="/dashboard/siswa" element={<Home />} />
          <Route path="/dashboard/pembina" element={<DashboardPembina/>}/>
          <Route path="/dashboard/pembina/daftar-siswa" element={<DaftarSiswaPembina/>}/>
          <Route path="/profile/siswa" element={<Profile />} />
          <Route path="/profile/pembina" element={<ProfilePembina />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/more-ekskul" element={<EskulLainnya />} />
          <Route path="/dashboard/siswa/profile-eskul/satryarover" element={<ProfileSatrov />} />
          <Route path="/dashboard/pembina/profile-eskul/satryarover" element={<ProfileSatrovPembina />} />
          <Route path="/more-ekskul/daftar/satryarover" element={<SatrovDaftar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
