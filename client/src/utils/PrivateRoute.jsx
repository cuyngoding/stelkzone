import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth"; // Ambil token dari localStorage

const PrivateRoute = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
