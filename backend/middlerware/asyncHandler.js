const asyncHandlerPromise = (requestHandler) => {
  // This middleware function wraps the provided requestHandler in a Promise
  // and catches any errors that may occur during its execution.
  return (req, res, next) => {
    // Resolve the Promise with the result of the requestHandler
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)); // Catch any errors and pass them to the next middleware
  };
};
module.exports = asyncHandlerPromise;
