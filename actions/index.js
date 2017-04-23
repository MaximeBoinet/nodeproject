module.exports = (api) => {
    api.actions = {
      users: require('./users/crud')(api),
    };
};
