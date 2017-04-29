module.exports = (api) => {
    const Produit = api.models.Produit;
    const User = api.models.User;

    function create(req, res, next) {
        const userId = req.userId;

        let produit = new Produit(req.body);

        if (produit.produitprix <= 0) {
          return res.status(401).send('price.cant.be.less.or.equal.zero');
        }

        produit.vendeur = userId;
        produit.datemisenvente = Date.now();

        produit.save((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.send(data);
        });
    };

    function findOne(req, res, next) {
        Produit.findById(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data) {
                return res.status(204).send(data);
            }
            return res.send(data);
        });
    }

    function findAll(req, res, next) {
        Produit.find((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data || data.length == 0) {
                return res.status(204).send(data)
            }

            api.middlewares.cache.set('Produit', data, req.originalUrl);
            return res.send(data);
        });
    }

    function findAllSelled(req, res, next) {
        User.find({
          _id: req.userId,
          isgbaystaff: true,
        }, (err, data) =>{
          if (err) {
            return res.status(500).send();
          }

          if (!data) {
            return res.status(401).send();
          }

          Produit.find({
            datevendu: {$ne:null},
          }, (err, data) => {
              if (err) {
                  return res.status(500).send(err);
              }
              if (!data || data.length == 0) {
                  return res.status(204).send(data)
              }

              return res.send(data);
          });
        })
    }

    function update(req, res, next) {
        Produit.findById(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send()
            }

            if (data.vendeur != req.userId) {
              return res.status(401).send('can.only.be.updated.by.owner');
            }

            data.update(req.body, (err, data) => {
              if (err) {
                return res.status(500).send();
              }

              return res.send(data);
            });
        });
    }

    function remove(req, res, next) {
        Produit.findById(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send();
            }

            if (data.vendeur != req.userId) {
              return res.status(401).send('can.only.be.removed.by.owner');
            }

            data.remove((err, data) => {
              if (err) {
                return res.status(500).send();
              }

              return res.send(data);
            });

        });
    }

    return {
        create,
        findOne,
        findAll,
        findAllSelled,
        update,
        remove
    };
}
