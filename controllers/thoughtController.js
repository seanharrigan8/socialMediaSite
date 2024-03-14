const Thought = require('../models/thought');
const User = require('../models/user');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}).populate('reactions');
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
},


//create new thought 
async createThought(req, res) {
    try {
        const newthought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        });

        //adding thoughts to user array of thought
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: newthought._id },
        });
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json(err);
    }
        },
        
//get a thought by id 
async getThoughtById({ params }, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

//update thought by id
async updateThought(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
            thoughtText: req.body.thoughtText,
        }, { new: true, runValidators: true });
        if(!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    }catch (err) {
        res.status(400).json(err);
    }
        },

        //delete thought by id
        async deleteThought (req, res) {
            try {
                const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                //delete thought from user array of thoughts
                await User.findByIdAndUpdate(req.body.userId, {
                    $pull: { thoughts: req.params.thoughtId },
                });
                res.json(thought);
            } catch (err) {
                res.status(400).json(err);
            }
        },

//REACTIONS
//add reaction to a thought //

async addReaction(req, res) {
    try {
        const reaction = await Thought.findByIdAndUpdate(req.params.thoughtId, {
            $push: { reactions: req.body },
        }, { new: true, runValidators: true });
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
    }
},

async deleteReaction(req, res) {
    try {
        const reaction = await Thought.findByIdAndUpdate(req.params.thoughtId, {
            $pull: { reactions: { reactionId: req.params.reactionId } },
        }, { new: true });
        if (!reaction) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
        }
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
    }
}
};



