const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    userNotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    userPollenData: [{
        type: Schema.Types.ObjectId,
        ref: 'PollenData'
    }],
    userLocation : {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
});

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);