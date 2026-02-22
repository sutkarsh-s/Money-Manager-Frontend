import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { useUser } from "../../hooks/useUser.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext);
    const location = useLocation();
    useUser();

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
