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
            type: Number,
            required: false
        },
        datemisenvente: {
            type: Date,
            required: true
        },
        datevendu: {
            type: Date,
            required: false
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
            ref: 'User',
            required: false
        },
        categorie: [{
            type: Schema.Types.ObjectId,
            ref: 'Categorie'
        }]
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Produit', schema)
};
