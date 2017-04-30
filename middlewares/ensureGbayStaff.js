module.exports = (api) => {
  const User = api.models.User;

  return (req, res, next) => {
    User.findOne({
      _id: req.userId,
      isgbaystaff: true,
    }, (err,data) => {
      if (err) {
        return res.status(500).send();
      }

      if(!data) {
        return res.status(401).send('not.gbaystaff');
      }

      return next();
    })
  }
}
