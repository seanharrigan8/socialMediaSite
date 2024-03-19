const { Thought, User } = require("../models");



module.exports = {
  async getAllThoughts(_, res) {
    try {
      const thoughts = await Thought.find();
    
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create new thought
  async createThought(req, res) {
    console.log(req.body);
    try {
      const thoughtData = await Thought.create(req.body);

      console.log(thoughtData);
      //adding thought to user array of thoughts
      const user = await User.findOneAndUpdate(
        {_id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true, runValidators: true }
      );
      console.error("updated user:", user);

      res.status(201).json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  //get a thought by id
  async getThoughtById(req, res) {
    console.log(req.params);
    console.log(req.params.thoughtId);
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate("reactions");
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json({
        ...thought.toObject(),
        reactionCount: thought.reactions.length,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  //update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
       {_id: req.params.thoughtId},
      { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!"  });
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
      const thought = await Thought.findByIdAndDelete({_id: req.params.thoughtId,
      });

    if(!thought) {
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
      const newReaction = await Thought.findOneAndUpdate ({_id: req.params.thoughtId }, 
         { $addToSet: { reactions: req.body } }, 
         { new: true, runValidators: true }
      );

      if (!newReaction) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    console.log("DELETE", req.params);

    try {
      const thought = await Thought.findOneAndUpdate( 
        {_id: req.params.thoughtId } ,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      console.log(thought);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

// Export the thought controller
