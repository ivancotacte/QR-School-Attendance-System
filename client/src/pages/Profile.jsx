import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <div className="w-full flex justify-center items-center">
                    <form className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
                            Profile Details
                        </h2>
                        <span className="text-gray-600 dark:text-gray-200 mt-1 text-center">
                            Update your profile details here.
                        </span>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    First Name
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter first name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Last Name
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter last name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Change Password
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Update Email
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                            >
                                Submit
                            </button>
                            <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        Back
                    </button>

                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Profile;
