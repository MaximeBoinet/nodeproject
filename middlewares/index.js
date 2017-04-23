module.exports = (api) => {
  api.middlewares = {
    ensureAuthenticated: require('./ensureAuthenticated')(api),
    logger: require('./logger'),
    bodyParser: require('body-parser'),
    cache: require('./cache')(api)
  };
};
