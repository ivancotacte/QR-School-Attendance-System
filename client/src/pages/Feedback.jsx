// eslint-disable-next-line react/prop-types
const Feedback = ({ closeModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <form className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
            Please Provide Your Feedback
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Provide Your Feedback:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-200 dark:placeholder-gray-400"
              placeholder="Enter your feedback here..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Category:
            </label>
            <select className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-200">
              <option value="">Select a Category</option>
              <option value="general">General</option>
              <option value="bug">Issue Report</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
