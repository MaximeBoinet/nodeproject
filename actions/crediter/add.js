module.exports = (api) => {
  const User = api.models.User;

  return function add(req, res, next) {
    User.findById(req.userId, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(401).send('invalid.credentials');
      }

      user.usercredit = user.usercredit + req.body.credit;

      user.save((err,data) => {
        if (err){
          return res.status(500).send();
        }

        return res.status(204).send(data);
      })
    });
  }
}
