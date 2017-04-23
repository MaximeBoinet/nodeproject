const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        produitprix: {
            type: Number,
            required: true
        },
        produitenchere: {
            type: Number,
            required: true
        },
        note: {
            type: Number
        },
        datemisenvente: {
            type: Date
        },
        datevendu: {
            type: Date
        },
        labelle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        vendeur: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        acheteur: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        categorie: [{
            type: Schema.Types.ObjectId,
            ref: 'Categorie',
            required: true
        }]
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Produit', schema)
};
