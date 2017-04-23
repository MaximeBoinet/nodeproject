const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.middlewares.cache.get,
        api.actions.produits.findAll);

    router.get('/:id',
        api.actions.produits.findOne);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.produits.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.produits.update);

    router.delete('/:id',
        api.actions.produits.remove);

    return router;
}
