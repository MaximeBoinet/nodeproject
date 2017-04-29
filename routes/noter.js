const router = require('express').Router();

module.exports = (api) => {
  router.post('/',
    api.middlewares.ensureAuthenticated,
    api.actions.encheres.noter);

  return router;
}
