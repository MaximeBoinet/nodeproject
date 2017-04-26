module.exports = (api) => {
  const Produit = api.models.Produit;
  const Enchere = api.models.Enchere;
  const User = api.models.User;

  return function acheter(req, res, next) {
    Produit.findById(req.params.id, (err, produit) =>{
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send();
      }

      if (produit.vendeur == req.userId) {
        return res.status(401).send('cant.buy.your.own.product');
      }

      if (!produit.produitprix) {
        return res.status(401).send('direct.buy.not.available');
      }

      User.findById(req.userId, (err, user) => {
        if (err) {
          return res.status(500).send();
        }

        if (user.usercredit < produit.produitprix) {
          return res.status(401).send('yon.dont.have.enough.credit');
        }

        produit.acheteur = req.userId;
        produit.produitenchere = 0;

        produit.save((err, prod) => {
          if (err) {
            return res.status(500).send();
          }

          Enchere.findOne({
            produit: req.params.id,
          }, (err, data) => {
            if (err) {
              return res.status(500).send();
            }

            User.findById(data.encherisseur, (err, user) => {
              if (err) {
                return req.status(500).send();
              }

              user.usercredit = user.usercredit + data.montant;
              user.save((err, data) => {
                if (err) {
                  return res.status(500).send();
                }

                return res.send(prod);
              });
            });
          })
        })
      })
    })
  }
}
