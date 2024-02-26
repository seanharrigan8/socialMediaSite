// Import mongoose library
const mongoose = require('mongoose');

// Define the schema for a User
const UserSchema = new mongoose.Schema({
    // Define a username field that is a string, required, trimmed and unique
    username: { type: String, required: true, trim: true, unique: true },
    
    // Define an email field that is a string, required, unique and matches a regex pattern for email validation
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] },
    
    // Define a thoughts field that is an array of ObjectIds referencing the Thought model
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    
    // Define a friends field that is an array of ObjectIds referencing the Thought model
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
}, { 
    // Enable virtuals when converting the document to JSON
    toJSON: {virtuals: true},
});

// Define a virtual property 'friendCount' that returns the length of the friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create a User model using the UserSchema

const ThoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [ReactionSchema]
});

const User = mongoose.model('User', UserSchema);
const Thought = mongoose.model('Thought', ThoughtSchema);

 
// Export the User model
module.exports = User;