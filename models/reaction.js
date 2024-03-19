const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');





const reactionSchema = new Schema({

    // The body of the reaction
    reactionBody: {
        type: String, 
        required: true,
        maxlength: 280
    },

    // The username of the user who made the reaction
    username: {
        type: String, 
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
}, {
    // Options for JSON serialization
    toJSON: {
        virtuals: true,
        getters: true
    },
    // id: false
});


module.exports = reactionSchema;