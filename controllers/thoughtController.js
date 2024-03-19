const Thought = require("../models/thought");
const User = require("../models/user");
const reactionSchema = require("../models/reaction");



module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  //create new thought
  async createThought(req, res) {
    console.log(req.body);
    try {
  
      const thought = await Thought.create(req.body);
      console.log(req.body.userId, thought);
      //adding thought to user array of thoughts
      const user = await User.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(req.body._id, )},
        { $push: { thoughts: thought._id } },
        { new: true, runValidators: true }
      );
      if(!user) {
        res.status(404).json({ message: "No user found with this username!" });
        return;
      }
      res.status(200).json(user);
    
    } catch (err) {
      res.status(400).json(err);
    }
  },

  //get a thought by id
  async getThoughtById(req, res) {
    console.log(req.params);
    console.log(req.params.thoughtId);
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  //update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
{ $set: req.body},
{ new: true, runValidators: true },
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  //delete thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);  
    }
    catch (err) {
      res.status(400).json(err);
    }
  },


  //REACTIONS
  //add reaction to a thought //

    async addReaction(req, res) {
      try {
        const newReaction = await Thought.findOneAndUpdate( { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { new: true, runValidators: true }
        );
        if (!newReaction) {
          return
          res.status(404).json({ message: "No thought found with this id!" });
          
        }
        res.json(newReaction);
      }
      catch (err) {
        res.status(400).json(err);
      }
    },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      console.log(thought);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    }
    catch (err) {
      res.status(400).json(err);
    }
  }
};

// module.exports = thoughtController;
