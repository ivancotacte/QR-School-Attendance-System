// Global error handling middleware
export default function errorHandler(err, req, res, next) {
  // Log the error as needed
  console.error(err);
  res
    .status(500)
    .json({ status: "failed", message: err.message || "Something went wrong" });
}
