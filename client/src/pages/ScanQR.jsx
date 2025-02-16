import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import Loading from '../components/Loading';
import { Scanner } from '@yudiel/react-qr-scanner';

const ScanQR = () => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [SelectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        document.title = "Scan QR Code";
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/classes/view', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            setClasses(data.data);
            setIsLoading(false);
        });
    }, [token]);

    const handleSelect = (id) => {
        setSelectedClass(id);
    }; 

    const handleScanQR = (data) => {
        console.log(data);
    };

    if (isLoading) return <Loading />;

    if (SelectedClass) {
        return (
            <div className='overflow-y-auto'>
            <div className="bg-gray-100 dark:bg-gray-900">
                <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3">
                    <div className="relative flex flex-col justify-center w-full max-w-3xl md:h-[50%] h-[50%] md:p-4 p-3">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col">
                                <h1 className="text-gray-800 dark:text-white">
                                    Scan QR Code
                                </h1>
                                <span className="text-gray-600 dark:text-gray-200 mt-1">
                                    Please scan the QR code to mark your attendance.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-white dark:bg-gray-800 w-80">
                                <Scanner onScan={handleScanQR} scanDelay="2000" allowMultiple="true" />
                                <button
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
                <div className="relative flex flex-col justify-center w-full max-w-3xl md:h-[98%] h-[95%] md:p-4 p-3">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h1 className="text-gray-800 dark:text-white">
                                Scan QR Code
                            </h1>
                            <span className="text-gray-600 dark:text-gray-200 mt-1">
                                Please scan the QR code to mark your attendance.
                            </span>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Class Name</th>
                                    <th scope="col" className="px-6 py-3">Section</th>
                                    <th scope="col" className="px-6 py-3">Schedule</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map(item => (
                                    <tr key={item.classId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.data.className}
                                        </th>
                                        <td className="px-6 py-4">{item.data.section}</td>
                                        <td className="px-6 py-4">{item.data.schedule}</td>
                                        <td className="px-6 py-4">
                                            <button 
                                                type="button" 
                                                onClick={() => handleSelect(item.classId)} 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Select
                                            </button>
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

export default ScanQR;