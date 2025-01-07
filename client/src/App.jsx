import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Gunakan `element` bukan `component` */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;