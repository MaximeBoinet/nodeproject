module.exports = (api) => {
  const User = api.models.User;
  const Avis = api.models.Avis;

  function create(req, res, next) {
      const userId = req.userId;

      let avis = new Avis(req.body);

      Avis.find({
        emeteur: req.userId,
        recepteur: req.params.id,
      }, (err, data) => {
        if (err) {
          return res.status(500).send();
        }

        if (data) {
          return res.status(401).send('you.already.have.one');
        }

        if (avis.description.length <= 0) {
          return res.status(401).send('you.have.to.enter.description');
        }

        avis.emeteur = req.userId;

        Produit.find({
          datevendu: {$ne:null},
          vendeur: req.params.id,
          acheteur: req.userId,
        }, (err, produit) => {
          if (err) {
            return res.status(500).send();
          }

          if (!produit) {
            Produit.find({
              datevendu: {$ne:null},
              vendeur: req.userId,
              acheteur: req.params.id,
            }, (err, produit) => {
              if (err) {
                return res.status(500).send();
              }

              if (!produit) {
                return res.status(401).send('you.still.have.no.deal.with.this.dude');
              }

              avis.save((err, data) => {
                if (err) {
                  return res.status(500).send();
                }

                return res.send(data);
              });
            });
          }

          avis.save((err, data) => {
            if (err) {
              return res.status(500).send();
            }

            return res.send(data);
          });
        });
      })
  };

  function findOne(req, res, next) {
    Avis.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(204).send(data);
        }
        return res.send(data);
    });
  }

  function findAllFromSeller(req, res, next) {
      User.find({
        recepteur: req.params.id,
      },(err, data) => {
          if (err) {
              return res.status(500).send(err);
          }
          if (!data || data.length == 0) {
              return res.status(204).send(data)
          }
          return res.send(data);
      });
  }

  function findAllFromBuyer(req, res, next) {
      User.find({
        emeteur: req.params.id,
      },(err, data) => {
          if (err) {
              return res.status(500).send(err);
          }
          if (!data || data.length == 0) {
              return res.status(204).send(data)
          }
          return res.send(data);
      });
  }

  function update(req, res, next) {
    Avis.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send();
      }

      if (!data) {
        return res.status(204).send();
      }

      if (data.emeteur != req.userId) {
          return res.status(401).send('not.your.avis');
      }

      data.description = req.body.description;

      data.save((err, data) => {
        if (err) {
          return res.status(500).send();
        }

        return res.send(data);
      });
    });
  }

  function remove(req, res, next) {
      Avis.findById(req.params.id, (err, data) => {
          if (err) {
              return res.status(500).send();
          }
          if (!data) {
              return res.status(204).send();
          }

          if (data.emeteur != req.userId) {
            return res.status(401).send('not.your.avis')
          }

          data.remove();
      });
  }

  return {
    create,
    findOne,
    findAllFromBuyer,
    findAllFromSeller,
    update,
    remove
  }
};
