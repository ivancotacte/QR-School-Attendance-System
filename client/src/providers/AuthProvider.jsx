import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Changed state hook from user/setUser to token/setToken
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const localToken = localStorage.getItem("token");
            if (localToken) {
                try {
                    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/verify", {
                        headers: { Authorization: `Bearer ${localToken}` }
                    });
                    const data = await res.json();
                    if (data.status === "success") {
                        setToken(localToken);
                    } else {
                        localStorage.removeItem("token");
                        setToken(null);
                    }
                } catch (error) {
                    localStorage.removeItem("token");
                    setToken(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        verifyToken();
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};