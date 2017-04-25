const router = require('express').Router();

module.exports = (api) => {
  router.post('/add',
    api.middlewares.bodyParser.json(),
    api.middlewares.ensureAuthenticated,
    api.actions.crediter.add);

    return router;
}
