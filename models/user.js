// Import mongoose library
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dateFormat = require("../utils/dateFormat.js");

// Define the schema for a User
const UserSchema = new mongoose.Schema(
  {
    // Define a username field that is a string, required, trimmed and unique
    username: { type: String, required: true, trim: true, unique: true },

    // Define an email field that is a string, required, unique and matches a regex pattern for email validation
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },

    // Define a thoughts field that is an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    // Define a friends field that is an array of ObjectIds referencing the Thought model
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Enable virtuals when converting the document to JSON
    toJSON: { virtuals: true },
  }
);

// Define a virtual property 'friendCount' that returns the length of the friends array
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a User model using the UserSchema


const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;

