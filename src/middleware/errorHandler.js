function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const environment = process.env.NODE_ENV || 'development';

  // Jeśli błąd pochodzi z axios lub innej biblioteki
  if (err.response) {
    // Błąd HTTP z odpowiedzią
    console.error('Axios Error details:', err.response.data);
    return res.status(err.response.status || status).json({
      status: err.response.status || status,
      message: err.response.statusText || 'HTTP error occurred',
      details: err.response.data || 'No additional details provided',
    });
  }

  // Obsługa błędów, które nie są związane z axios
  if (environment === 'development') {
    console.error('Error details:', err);

    return res.status(status).json({
      status: status,
      message: err.message || 'Internal Server Error',
      details: err.details || 'No additional details provided',
    });
  }

  // Produkcyjna wersja odpowiedzi
  console.error('Error:', err.message || 'Internal Server Error');
  return res.status(status).json({
    status: status,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;