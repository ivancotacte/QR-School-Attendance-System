import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassPage = () => {
    const navigate = useNavigate();
    const [classInfo, setClassInfo] = useState({
        className: '',
        section: '',
        schedule: '',
        description: ''
    });

    const handleChange = (e) => {
        setClassInfo({ ...classInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating class with details:', classInfo);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Create Class</h2>
                    <div className="mb-4">
                        <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Class Name
                        </label>
                        <input
                            type="text"
                            id="className"
                            name="className"
                            value={classInfo.className}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter class name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Section
                        </label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            value={classInfo.section}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter section"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Schedule
                        </label>
                        <input
                            type="text"
                            id="schedule"
                            name="schedule"
                            value={classInfo.schedule}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="e.g. Mon, Wed, Fri - 10:00 AM"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={classInfo.description}
                            onChange={handleChange}
                            placeholder="Enter class description"
                            className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        Create Class
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        Back
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ClassPage;
