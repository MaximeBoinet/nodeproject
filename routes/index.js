module.exports = (api) => {
  //api.use(api.middlewares.logger);
  api.use('/users', require('./users')(api));
};
