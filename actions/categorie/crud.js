module.exports = (api) => {
  const Categorie = api.models.Categorie;

  function create(req, res, next) {
    let categorie = new Categorie(req.body);

    if (!categorie || categorie.labellecategorie.length <= 0) {
     return res.status(403).send('categorie.cant.be.empty');
    }

    Categorie.findOne({
      labellecategorie: categorie.labellecategorie,
    }, (err, cat) => {
      if (err) {
        return res.status(500).send();
      }

      if (cat) {
        return res.status(403).send('this.categorie.already.exist');
      }

      categorie.save((err, data) => {
        if (err) {
          return res.status(500).send();
        }

        return res.send(data);
      })
    })
  }

  function findOne(req, res, next) {
      Categorie.findById(req.params.id, (err, data) => {
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
      Categorie.find((err, data) => {
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
    Categorie.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!data) {
            return res.status(204).send()
        }
        
        return res.send(data);
    });
  }

  function remove(req, res, next) {
      Categorie.findById(req.params.id, (err, data) => {
          if (err) {
              return res.status(500).send(err);
          }

          if (!data) {
              return res.status(204).send();
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
    update,
    remove
  };
}
