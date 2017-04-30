module.exports = (api) => {
    const Produit = api.models.Produit;
    const User = api.models.User;

    function create(req, res, next) {
        const userId = req.userId;

        let produit = new Produit(req.body);

        if (produit.produitprix <= 0) {
          return res.status(403).send('price.cant.be.less.or.equal.zero');
        }

        User.findOne(req.userId, (err, user) => {
          if (err) {
            return res.status(500).send();
          }

          user.isVendor = true;
          user.save((err, user) => {
            produit.vendeur = userId;
            produit.datemisenvente = Date.now();

            produit.save((err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }

                return res.send(data);
            });
          })
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
      setTimeout(getProduit, 2000);
      function getProduit() {
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
    }

    function findAllSorted(req, res, next) {
        Produit.find((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data || data.length == 0) {
                return res.status(204).send(data)
            }

            return res.send(data);
        }).sort({produitprix: req.params.indice});
    }

    function findAllBound(req, res, next) {
        Produit.find((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data || data.length == 0) {
                return res.status(204).send(data)
            }

            return res.send(data);
        }).skip(Number(req.params.offset)).limit(Number(req.params.limit));
    }

    function findByCat(req, res, next) {
      Produit.find({
        categorie: req.params.cat,
      }, (err, data) => {
        if (err) {
          return res.status(500).send();
        }

        if (!data) {
          return res.status(204).send();
        }

        return res.send(data)
      })
    }

    function findBySeller(req, res, next) {
      Produit.find({
        vendeur: req.params.seller,
      }, (err, data) => {
        if (err) {
          return res.status(500).send();
        }

        if (!data) {
          return res.status(204).send();
        }

        return res.send(data)
      })
    }

    function findAllSelled(req, res, next) {
        if (req.params.id == null || req.params.id == "") {
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
        }

        Produit.find({
          vendeur: req.params.id,
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
      }

    function update(req, res, next) {
        Produit.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send()
            }

            if (data.vendeur.toString() != req.userId) {
              return res.status(401).send('can.only.be.updated.by.owner');
            }

            return res.send(data);
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

            if (data.vendeur.toString() != req.userId) {
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
        findAllBound,
        findAllSorted,
        update,
        findByCat,
        findBySeller,
        remove
    };
}
