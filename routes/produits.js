const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.middlewares.cache.get,
        api.actions.produits.findAll);

    router.get('/sorted/:indice',
        api.actions.produits.findAllSorted);

    router.get('/selled',
        api.middlewares.ensureAuthenticated,
        api.middlewares.ensureGbayStaff,
        api.actions.produits.findAllSelled);

    router.get('/selled/:id',
        api.middlewares.ensureAuthenticated,
        api.middlewares.ensureGbayStaff,
        api.actions.produits.findAllSelled);

    router.get('/cat/:cat',
        api.actions.produits.findByCat);

    router.get('/seller/:seller',
        api.actions.produits.findBySeller);

    router.get('/:id',
        api.actions.produits.findOne);

    router.get('/:offset/:limit',
        api.actions.produits.findAllBound);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.middlewares.cache.clean("Produit"),
        api.actions.produits.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.produits.update);

    router.delete('/:id',
        api.actions.produits.remove);

    return router;
}
