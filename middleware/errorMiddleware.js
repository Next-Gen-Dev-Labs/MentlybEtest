const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongoose and bad ObjectId

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack:
      process.env.Node_ENV === "production"
        ? "Designed by BeeTech +2349020533101 Whatsapp only"
        : err.stack,
  });
};

module.exports = { errorHandler };
