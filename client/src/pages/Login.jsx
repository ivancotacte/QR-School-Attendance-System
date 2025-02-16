import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                login(data.token);
                navigate('/dashboard', { replace: true });
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            localStorage.removeItem("token");
            // Optionally, add code to display an error message to the user
        }
    };

    useEffect(() => {
        document.title = 'Login - QR School Attendance System';
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Login</h2>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <div className="flex mb-2 justify-between items-center">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <a href="#" className="text-blue-600 text-sm hover:underline dark:text-blue-400">Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        Login
                    </button>
                    <div className="center-content"></div>
                    <div className="pt-3.5 text-sm flex flex-col items-center text-gray-900 dark:text-white">
                        Don&apos;t have an account? <a href="/register" className="text-gray-900 dark:text-white"><u>Register here</u></a>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;