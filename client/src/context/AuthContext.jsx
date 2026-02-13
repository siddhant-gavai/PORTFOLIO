import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            const storedAdmin = localStorage.getItem('admin');

            if (token && storedAdmin) {
                setAdmin(JSON.parse(storedAdmin));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });

            const { token, ...userData } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('admin', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setAdmin(userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        delete axios.defaults.headers.common['Authorization'];
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
