module.exports = (api) => {
  const User = api.models.User;
  const Enchere = api.models.Enchere;
  const Produit = api.models.Produit;

  return function encherir(req, res, next) {
    Produit.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send();
      }

      if (!data) {
        return res.status(401).send('product.does.not.exist');
      }

      if (data.vendeur.toString() == req.userId) {
        return res.status(401).send('cant.on.your.own.product');
      }

      Enchere.findOne({
        produit: req.params.id,
      }, (err, enchere) => {
        if (err) {
          return res.status(500).send();
        }

        if (req.body.montant <= 0) {
          return res.status(401).send('amount.is.less.than.zero');
        }

        if (enchere && enchere.encherisseur.toString() == req.userId) {
          return res.status(401).send('you.already.have.this.auction')
        }

        User.findById(req.userId, (err, data) => {
          if (err) {
            return res.status(500).send();
          }

          if (data.usercredit < req.body.montant) {
            return res.status(401).send('you.are.poor');
          }

          if (!enchere) {
            let enchere  = new Enchere(req.body);
            enchere.date = Date.now();
            enchere.encherisseur = req.userId;
            enchere.produit = req.params.id;
            enchere.save((err, data) => {
              if (err) {
                return res.status(500).send(err);
              }
              return res.send(data);
            });
          } else {

          if (req.body.montant <= enchere.montant) {
            return res.status(401).send('amount.is.less.than.the.one.already.in.place');
          }

          User.findById(enchere.encherisseur, (err, user) => {
            if (err) {
              return res.status(500).send(err);
            }

            user.usercredit = user.usercredit + enchere.montant;

            user.save((err, data) => {
              if (err) {
                return res.status(500).send(err);
              }

              enchere.montant = req.body.montant;

              enchere.save((err, datae) => {
                if (err) {
                  return res.status(500).send(err);
                }

                User.findById(req.userId, (err, user) => {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  user.usercredit = user.usercredit - req.body.montant;

                  user.save((err, data) => {
                    if (err) {
                      return res.status(500).send(err);
                    }

                    return res.send(datae);
                  });
                });
              });
            });
          });
        }
        });
      });
    });
  };
}
