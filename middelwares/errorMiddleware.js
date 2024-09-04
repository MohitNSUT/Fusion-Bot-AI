import errorResponse from "../utils/errroResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose cast Error
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new errorResponse(message, 404);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });

  next(); 
};

export default errorHandler;

