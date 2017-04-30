module.exports = (api) => {
  const Produit = api.models.Produit;

  return function create(req, res, next) {
    Produit.findById(req.params.id, (err, produit) => {
      if (err) {
        return res.status(500).send();
      }

      if (!produit) {
        return res.status(403).send('id.not.found');
      }

      if (produit.acheteur.toString() != req.userId) {
        return res.status(403).send('not.your.deal');
      }

      produit.note = req.body.note;

      produit.save((err, data) => {
        if (err) {
          return res.status(500).send();
        }

        return res.send(data);
      })
    })

  }
}
