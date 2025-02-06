import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileSatrov from './pages/Satrov';
import './App.css';
import NotFound from './pages/NotFound';
import EskulLainnya from './pages/EskulLainnya';

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
          <Route path="/dashboard/siswa" element={<Home />} />
          <Route path="/profile/siswa" element={<Profile />} />
          <Route path="/more-ekskul" element={<EskulLainnya />} />
          <Route path="/home/satryarover" element={<ProfileSatrov />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
