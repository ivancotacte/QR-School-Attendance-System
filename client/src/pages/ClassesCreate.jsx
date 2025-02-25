// ClassesCreate.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const ClassesCreate = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [classInfo, setClassInfo] = useState({
        className: '',
        course: '',
        section: '',
        scheduleStart: '',
        scheduleEnd: '',
    });

    const handleChange = (e) => {
        setClassInfo({ ...classInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { 
            ...classInfo, 
            schedule: `${classInfo.scheduleStart} - ${classInfo.scheduleEnd}` 
        };
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/classes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                navigate('/dashboard');  
            } else {
                alert(data.message);
            }
        });
    };

    useEffect(() => {
        document.title = 'Create Class - QR School Attendance System';
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Create Class</h2>
                    <div className="mb-4">
                        <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                        <input type="text" id="className" name="className" value={classInfo.className} onChange={handleChange}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                               placeholder="Enter class name" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                        <input type="text" id="course" name="course" value={classInfo.course} onChange={handleChange}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                               placeholder="Enter course" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                        <input type="text" id="section" name="section" value={classInfo.section} onChange={handleChange}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                               placeholder="Enter section" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Schedule</label>
                        <div className="flex items-center gap-2">
                            <input type="time" name="scheduleStart" value={classInfo.scheduleStart} onChange={handleChange}
                                   className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            <span className="text-gray-900 dark:text-white"> - </span>
                            <input type="time" name="scheduleEnd" value={classInfo.scheduleEnd} onChange={handleChange}
                                   className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                        Create Class
                    </button>
                    <button type="button" onClick={() => navigate(-1)}
                            className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600">
                        Back
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ClassesCreate;
