// Import mongoose library
const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat.js");
const thoughtSchema = require("./thought");


// Define the schema for a User
const UserSchema = new Schema(
  {
    // Define a username field that is a string, required, trimmed and unique
    username: { type: String, required: true, unique: true },

    // Define an email field that is a string, required, unique and matches a regex pattern for email validation
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },

    friends : [
      {type: Schema.Types.ObjectId,
      ref: "User"}
    ],


    // Define a thoughts field that is an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },

  {
    // Enable virtuals when converting the document to JSON
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);


// Define a virtual property 'friendCount' that returns the length of the friends array
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a User model using the UserSchema


const User = model("User", UserSchema);

// Export the User model
module.exports = User;

