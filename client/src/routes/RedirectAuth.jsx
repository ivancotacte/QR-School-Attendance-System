import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const RedirectAuth = ({ children }) => {
    const { token, loading } = useAuth();
    if (loading) return null; // or a loading spinner
    return token ? <Navigate to="/dashboard" /> : children;
};

export default RedirectAuth;
