module.exports = (api) => {
    const Produit = api.models.Produit;
    const User = api.models.User;

    function create(req, res, next) {
        const userId = req.userId;

        let produit = new Produit(req.body);
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

            return res.send(data);
        });
    }

    function remove(req, res, next) {
        Produit.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
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
        update,
        remove
    };
}
