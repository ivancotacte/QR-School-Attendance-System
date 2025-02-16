import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '../providers/AuthProvider';

const ClassesView = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const { token } = useAuth();
    
    useEffect(() => {
        document.title = "Classes View";
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/classes/view', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            setClasses(data.data);
            setIsLoading(false);
        })
    }, [token]);

    if (isLoading) return <Loading />;

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <div className="relative flex flex-col justify-center w-full max-w-3xl md:h-[98%] h-[95%] md:p-4 p-3">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h1 className="text-gray-800 dark:text-white">
                                Classes View
                            </h1>
                            <span className="text-gray-600 dark:text-gray-200 mt-1">
                                View all classes here.
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => navigate("/classes/create")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Create Class
                            </button>
                            <button type="button" onClick={() => navigate(-1)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Back
                            </button>
                        </div>
                    </div>
                    
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Class name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Course
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        section
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        schedule
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map(item => (
                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.data.className}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.data.course}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.data.section}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.data.schedule}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" aria-disabled>Edit</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClassesView;