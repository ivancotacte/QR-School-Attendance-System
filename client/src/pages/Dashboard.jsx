import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useAuth } from "../providers/AuthProvider";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();

    const handleFeedback = () => {
        navigate("/feedback");
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    useEffect(() => {
        document.title = "Dashboard - QR School Attendance System";
        const fetchData = async () => {
            fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/user`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
        };
        fetchData();
    }, [token]);

    if (isLoading) {
        return (
            <div className="bg-gray-100 dark:bg-gray-900 flex h-screen items-center justify-center">
                <p className='text-gray-800 dark:text-white'>Loading...</p>
            </div>
        );
    }

    return (
        <div className="pages">
            <Navbar />
            <section className="bg-gray-100 dark:bg-gray-900 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-y-auto">
                <div className="relative flex flex-col justify-center w-full max-w-3xl md:h-[98%] h-[95%] md:p-4 p-3">
                    <div className="flex flex-col leading-none mb-6">
                        <h1 className="text-gray-800 dark:text-white">
                            Good day, {user?.data.firstName || 'User'}!
                        </h1>
                        <span className="text-gray-600 dark:text-gray-200 mt-1">
                            Welcome to QR School Attendance System! Let&apos;s streamline your class management.
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:gap-4 gap-3">
                        <button onClick={handleProfile} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-8 size-7 text-gray-900 dark:text-white">
                                        <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                                    </svg>
                                </div>
                            </div>
                            Profile
                            <span className="text-gray-600 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                View and manage your account details.
                            </span>
                        </button>
                        <button onClick={handleFeedback} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-8 size-7 text-neutral-700 dark:text-neutral-200">
                                        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </div>
                            </div>
                            Feedback
                            <span className="text-neutral-500 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                Provide feedback or report an issue.
                            </span>
                        </button>
                        <button onClick={() => navigate("/classes/create")} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="md:size-8 size-7 text-gray-900 dark:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                            Add Class
                            <span className="text-gray-600 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                Schedule a new class or meeting.
                            </span>
                        </button>
                        <button onClick={() => navigate("/classes/view")} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="md:size-8 size-7 text-gray-900 dark:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                                    </svg>
                                </div>
                            </div>
                            View Classes
                            <span className="text-gray-600 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                See your scheduled classes.
                            </span>
                        </button>
                        <button onClick={() => navigate("/generate-qr")} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="md:size-8 size-7 text-gray-900 dark:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v3h-8v-3z" />
                                    </svg>
                                </div>
                            </div>
                            QR Code
                            <span className="text-gray-600 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                Generate a new QR code for attendance.
                            </span>
                        </button>
                        {/* New Scan QR button */}
                        <button onClick={() => navigate("/scan-qr")} className="flex flex-col items-start border border-gray-300 dark:border-gray-700 md:p-3 p-2 rounded-2xl group text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between">
                                <div className="md:size-12 size-11 flex items-center justify-center border dark:border-neutral-700 rounded-xl md:mb-3 mb-2 bg-white dark:bg-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="md:size-8 size-7 text-gray-900 dark:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 100 14 7 7 0 000-14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                                    </svg>
                                </div>
                            </div>
                            Scan QR
                            <span className="text-gray-600 dark:text-gray-200 md:text-sm text-xs leading-4 text-start">
                                Scan QR code for attendance.
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;