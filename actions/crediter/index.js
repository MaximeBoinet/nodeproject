module.exports = (api) => {
    return {
        add: require('./add')(api),
        pull: require('./pull')(api)
    };
};
