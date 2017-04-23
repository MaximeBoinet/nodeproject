const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (api) => {
    api.mongoose = mongoose.connect(api.settings.db.url);
    api.mongoose.promise = Promise;
    api.models = {
        Avis: require('./Avis')(api),
        Categorie: require('./Categorie')(api),
        Enchere: require('./Enchere')(api),
        Produit: require('./Produit')(api),
        User: require('./User')(api),
        Token: require('./Token')(api)
    };
};
