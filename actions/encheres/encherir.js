module.exports = (api) => {
  const User = api.models.User;
  const Enchere = api.models.Enchere;

  return function encherir(req, res, next) {
    Produit.findById(req.body.produit, (err, data) => {
      if (err) {
        return res.status(500).send();
      }

      if (!data) {
        return res.status(401).send('product.does.not.exist');
      }

      if (data.vendeur == req.userId) {
        return res.status(401).send('cant.on.your.own.product');
      }

      Enchere.findOne({
        produit: req.body.produit,
      }, (err, enchere) => {
        if (err) {
          return res.status(500).send();
        }

        if (req.body.montant <= 0) {
          return res.status(401).send('amount.is.less.than.zero');
        }

        if (enchere.encherisseur == req.userId) {
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

            enchere.save((err, data) => {
              if (err) {
                return res.status(500).send(err);
              }
              return res.status(204).send(data);
            });
          }

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

                    return res.status(204).send(datae);
                  });
                });
              });
            });
          });
        });
      });
    });
  };
}
