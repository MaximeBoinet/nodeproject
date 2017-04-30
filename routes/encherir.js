const router = require('express').Router();

module.exports = (api) => {
  router.post('/acheter/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.encheres.acheter);

    router.post('/encherir/:id',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureAuthenticated,
      api.actions.encheres.encherir);

    router.post('/noter/:id',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureAuthenticated,
      api.actions.encheres.noter);

    return router;
}
