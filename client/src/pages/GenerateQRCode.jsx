import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode'

const GenerateQRCode = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idOrLRN: '',
        firstName: '',
        lastName: '',
        course: '', // added course field
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        GenerateQRCode();
    };

    useEffect(() => {
        document.title = 'Generate QR Code | Student Information System';
    }, []);

    const GenerateQRCode = () => {
        QRCode.toDataURL(
            formData.idOrLRN + "|" + formData.firstName + "|" + formData.lastName + "|" + formData.course + "|" + formData.email, 
            { width: 500 },
            (err, url) => {
                if(err) return console.error(err);
                handleDownload(url);
                setFormData({
                    idOrLRN: '',
                    firstName: '',
                    lastName: '',
                    course: '',
                    email: ''
                });
            }
        );
    };

    const handleDownload = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = formData.firstName + " " + formData.lastName + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900">
            <section className="bg-gray-100 dark:bg-gray-900 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-y-auto">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Generate QR Code</h2>
                    <div className="mb-4">
                        <label htmlFor="idOrLRN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID or LRN Number</label>
                        <input
                            type="text"
                            id="idOrLRN"
                            name="idOrLRN"
                            value={formData.idOrLRN}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your ID or LRN"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    {/* New input for course */}
                    <div className="mb-4">
                        <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter your course"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        Back
                    </button>
                </form>
            </section>
        </div>
    );
};

export default GenerateQRCode;
