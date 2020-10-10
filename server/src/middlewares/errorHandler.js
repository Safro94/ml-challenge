const errorHandler = (error, _req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'No stack' : error.stack,
  });
  next();
};

module.exports = errorHandler;
