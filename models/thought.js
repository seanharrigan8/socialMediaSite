const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');
const { Schema } = mongoose;
// Importing required modules

// Reaction Schema
const reactionSchema = new mongoose.Schema({
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

    // The creation date of the reaction
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
    id: false
});

const Reaction = mongoose.model('Reaction', reactionSchema);

// Thought Schema
const thoughtSchema = new mongoose.Schema({
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

    // The username of the user who made the thought
    username: {
        type: String,
        required: true
    },

    // Array of reactions associated with the thought
    reactions: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reaction",
        }, 
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
const Thought = mongoose.model('Thought', thoughtSchema);

// Exporting the Thought model
module.exports = Thought;
module.exports = Reaction;
