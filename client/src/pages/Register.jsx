import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log('Registering new account with details:', credentials);
        navigate('/login');
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Register</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={credentials.firstName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={credentials.lastName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        Register
                    </button>
                    <div className="pt-3.5 text-sm flex flex-col items-center text-gray-900 dark:text-white">
                        Already have an account? <a href="/login" className="text-gray-900 dark:text-white"><u>Login here</u></a>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Register;
