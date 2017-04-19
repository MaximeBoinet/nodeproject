const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        labellecategorie: {
            type: String,
            required: true
        }
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Categorie', schema);
};
