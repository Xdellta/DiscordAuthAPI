function helloAdmin(req, res, next) {
  try {
    res.send('Hello Admin');

  } catch (error) {
    next(error);
  }
}

module.exports = { helloAdmin };