import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        if (res.success) {
            navigate('/admin/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-secondary p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
