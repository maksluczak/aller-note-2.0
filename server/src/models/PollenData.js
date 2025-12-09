const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollenDataSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now,
        required: true
    },
    alderPollen: {
        type: Number,
        default: 0.0
    },
    birchPollen: {
        type: Number,
        default: 0.0
    },
    grassPollen: {
        type: Number,
        default: 0.0
    },
    mugwortPollen: {
        type: Number,
        default: 0.0
    },
    olivePollen: {
        type: Number,
        default: 0.0
    },
    ragweedPollen: {
        type: Number,
        default: 0.0
    },
    pollenDataUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pollenDataLocation: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true
    }
})

module.exports = mongoose.model("PollenData", pollenDataSchema);