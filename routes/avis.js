const router = require('express').Router();

module.exports = (api) => {
  router.get('/buyer/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.avis.findAllFromBuyer);

  router.get('/seller/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.avis.findAllFromSeller);

  router.get('/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.avis.findOne);

  router.post('/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.avis.create);

  router.put('/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.avis.update);

  router.delete('/:id',
    api.actions.avis.remove);

  return router;
}
