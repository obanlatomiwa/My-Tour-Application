class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // to label operational errors
    this.isOperational = true;

    // to handle error message to send
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constuctor);
  }
}

module.exports = AppError;
