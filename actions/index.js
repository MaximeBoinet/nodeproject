module.exports = (api) => {
    api.actions = {
      auth: require('./auth')(api),
      users: require('./users/crud')(api),
      produits: require('./produits/crud')(api),
      crediter: require('./crediter')(api),
      encheres: require('./encheres')(api),
      avis: require('./avis/crud')(api),
      categorie: require('./categorie/crud')(api)
    };
};
