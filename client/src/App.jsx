import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileSatrov from './pages/Satrov';
import './App.css';

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') {
        document.body.style.overflow = 'hidden'; // Hilangkan scroll di halaman Login
      } else {
        document.body.style.overflow = 'auto'; // Aktifkan scroll di halaman lain
      }
    }, [location]);

    return children;
  };

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home/satrov" element={<ProfileSatrov />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
