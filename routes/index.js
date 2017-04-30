module.exports = (api) => {
  api.use(api.middlewares.logger);
  api.use('/users', require('./users')(api));
  api.use('/auth', require('./auth')(api));
  api.use('/produits', require('./produits')(api));
  api.use('/crediter', require('./crediter')(api));
  api.use('/encherir', require('./encherir')(api));
  api.use('/avis', require('./avis')(api));
  api.use('/noter', require('./noter')(api));
  api.use('/categorie', require('./categorie')(api));
};
