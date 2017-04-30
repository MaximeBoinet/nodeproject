const router = require('express').Router();

module.exports = (api) => {
  router.get('/',
    api.actions.categorie.findAll);

  router.get('/:id',
    api.actions.categorie.findOne);

  router.post('/',
    api.middlewares.ensureAuthenticated,
    api.middlewares.ensureGbayStaff,
    api.actions.categorie.create);

  router.put('/:id',
    api.middlewares.ensureAuthenticated,
    api.middlewares.ensureGbayStaff,
    api.actions.categorie.update);

  router.delete('/:id',
    api.middlewares.ensureAuthenticated,
    api.middlewares.ensureGbayStaff,
    api.actions.categorie.remove);

  return router;
}
