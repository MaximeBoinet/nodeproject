const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        montant: {
            type: Number,
            required: true
        },
        date: {
            type: Date
        },
        encherisseur: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        produit: {
            type: Schema.Types.ObjectId,
            ref: 'Produit'
        }
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Enchere', schema);
}
