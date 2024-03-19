import mongoose from 'mongoose';
import dateFormat from '../utils/dateFormat.js';
const { Schema } = mongoose;
import Thought from './thought.js';



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