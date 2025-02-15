import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const ProtectedRoute = () => {
    const { token, loading } = useAuth(); // Destructure loading
    if (loading) return null; // or show a loading spinner
    if (!token) return <Navigate to="/login" />;
    return <Outlet />;
};