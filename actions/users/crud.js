const sha1 = require('sha1');

module.exports = (api) => {
    const User = api.models.User;
    const Produit = api.models.Produit;
    const Enchere = api.models.Enchere;

    function create(req, res, next) {
        let user = new User(req.body);
        user.mdp = sha1(user.mdp);
        User.findOne({
            mail: user.mail,
        }, (err, found) => {
            if (err) {
                return res.status(500).send(err)
            }
            if (found) {
                return res.status(401).send('email.already.exists')
            }
            User.count((err, count) => {
                if (err) {
                    return res.status(500).send();
                }

                if (count == 0) {
                    user.isgbaystaff = true;
                    return saveUser();
                }

                return saveUser();
            })
        });

        function saveUser() {
            user.save((err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.send(data);
            })
        }
    }

    function findOne(req, res, next) {
        User.findById(req.params.id, (err, data) => {
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
        setTimeout(getUsers, 3000);
        function getUsers() {
            User.find((err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!data || data.length == 0) {
                    return res.status(204).send(data)
                }
                api.middlewares.cache.set('User', data, req.url);
                return res.send(data);
            });
        }
    }

    function findAllSeller(req, res, next) {
        setTimeout(getUsers, 3000);
        function getUsers() {
            User.find({
              isVendor: true,
            }, (err, data) => {
                if (err) {
                    return res.status(500).send();
                }
                if (!data || data.length == 0) {
                    return res.status(204).send(data)
                }
                api.middlewares.cache.set('User', data, req.url);
                return res.send(data);
            });
        }
    }

    function update(req, res, next) {
        if (req.userId != req.params.id) {
          return res.status(401).send('cant.modify.another.user');
        }
        User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send();
            }
            return res.send(data);
        });
    }

    function remove(req, res, next) {
        if (req.userId != req.params.id) {
          return res.status(401).send('cant.delete.this.account');
        }

        Produit.find({
          vendeur: req.userId,
        }, (err, produit) => {
          if (err) {
            return res.status(500).send();
          }

          produit.forEach((data) => {Enchere.find({
            produit : this._id,
          }, (err, data) => {
            if (err) {
              return res.status(500).send();
            }

            if (data) {
              User.findById(data.encherisseur, (err, user) => {
                user.usercredit = user.usercredit + data.montant;

                user.save((err, data) => {
                  if (err) {
                    return res.status(500).send();
                  }
                })
              })
            }

            data.delete((err,data) => {
              if (err) {
                return res.status(500).end();
              }
            })
          })})
        })

        User.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send();
            }
            if (!data) {
                return res.status(204).send();
            }
            return res.send(data);
        });
    }

    return {
        create,
        findOne,
        findAll,
        findAllSeller,
        update,
        remove
    };
}
