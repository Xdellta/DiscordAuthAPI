const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const environment = process.env.NODE_ENV || 'development';

  if (environment === 'development') {
    console.error(`[Error] ${err.message}`);

    if(err.stack) {
      console.error(err.stack);
    }

    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: err.message || 'An unexpected error occurred.',
      stack: err.stack,
    });

  } else {
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: err.message || 'An unexpected error occurred.',
    });
  }
};

module.exports = errorHandler;
