import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    feedback: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch (import.meta.env.VITE_BACKEND_URL + "/api/v1/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Feedback submitted successfully!");
        navigate(-1);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    })
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="h-[93vh] md:h-screen lg:pt-6 md:pt-14 pt-11 flex flex-col gap-3 justify-center items-center md:p-6 py-2 px-3 overflow-hidden">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md w-11/12 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
            Please Provide Your Feedback
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Feedback:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-200 dark:placeholder-gray-400"
              placeholder="Enter your feedback here..."
              value={feedback.feedback}
              onChange={(e) => setFeedback({ ...feedback, feedback: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category:
            </label>
            <select
              className="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-200"
              value={feedback.category.value}
              onChange={(e) => setFeedback({ 
                ...feedback, 
                category: { 
                  value: e.target.value, 
                  label: e.target.options[e.target.selectedIndex].text 
                } 
              })}
            >
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
            onClick={() => navigate(-1)}
            className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
