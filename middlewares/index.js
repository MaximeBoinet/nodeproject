module.exports = (api) => {
    api.middlewares = {
        cache: require('./cache')(api)
    };
};
