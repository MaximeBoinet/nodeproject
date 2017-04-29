module.exports = (api) => {
    return {
        acheter: require('./acheter')(api),
        encherir: require('./encherir')(api),
        noter: require('./noter')(api)
    };
};
