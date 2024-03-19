const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');
const reactionSchema = require('./reaction');

// Importing required modules

// Reaction Schema




// Thought Schema
const thoughtSchema = new Schema({

     // The username of the user who made the thought
     username: {
        type: String,
        required: true
    },
    // The text of the thought
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    // The creation date of the thought
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },

    // Array of reactions associated with the thought
    reactions: [reactionSchema
    ],
}, {
    // Options for JSON serialization
    toJSON: {
        virtuals: true,
        getters: true
    }

});

// Virtual property to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Creating the Thought model
const Thought = model('Thought', thoughtSchema);

// Exporting the Thought model
module.exports = Thought;