import { Navigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("jwt");
  const user = parseJwt(token);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role_id)) {
    return <Navigate to="/" />;
  }
  return children;
}