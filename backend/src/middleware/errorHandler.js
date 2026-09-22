function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  });
}

function errorHandler(err, req, res, next) {
  console.log(err);

  return res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong'
  });
}

module.exports = {
  notFound,
  errorHandler
};