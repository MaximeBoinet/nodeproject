const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        mail: {
            type: String,
            required: true,
            unique: true
        },
        mdp: {
            type: String,
            required: true
        },
        usercredit: {
            type: Number,
            required: true
        },
        isVendor: {
          type: Boolean,
          required: true
        },
        isgbaystaff: {
          type: Boolean,
          required: true
        },
        rue: {
            type: String
        },
        ville: {
            type: String
        },
        pays: {
            type: String
        }
    });

    schema.plugin(timestamps);
    return api.mongoose.model('User', schema);
};
