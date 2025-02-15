export default function successHandler(req, res, next) {
  // Attach a success method to the response object
  res.success = function (data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({ status: "success", message, data });
  };
  next();
}
