module.exports = function (req, res, next) {
  let filters = JSON.parse(new Buffer((req.query.filters || 'e30='), 'base64').toString('ascii'));
  req.locals = {
    decodedFilters: filters
  }
  next();
};
