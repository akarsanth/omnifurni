const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);

  // passing error to next default error middleware
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // sometimes 500 error is shown as 200
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);

  console.log("In error handler middleware");

  // this will be set in data property (of error.response)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
