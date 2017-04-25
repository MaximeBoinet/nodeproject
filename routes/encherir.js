const router = require('express').Router();

module.exports = (api) => {
  router.post('/acheter',
    api.middlewares.bodyParser.json(),
    api.middlewares.ensureAuthenticated,
    api.actions.encheres.acheter);

    router.post('/encherir',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureAuthenticated,
      api.actions.encheres.encherir);

    return router;
}
