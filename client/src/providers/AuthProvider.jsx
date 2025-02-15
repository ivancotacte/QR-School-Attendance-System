import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Changed state hook from user/setUser to token/setToken
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Renaming local variable to avoid conflict
        const localToken = localStorage.getItem("token");
        if (localToken) {
            fetch("/api/v1/auth/verify", {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    // Optionally set token from data if needed, here we re-use localToken
                    setToken(localToken);
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                setToken(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
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