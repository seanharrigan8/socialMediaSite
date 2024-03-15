const express = require('express');
const router = express.Router();
// const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, addReaction, removeReaction } = require('../controllers/thoughtController');
const thoughtController = require('../../controllers/thoughtController');
const { route } = require('./userRoutes');
const userController = require('../../controllers/userController');

router.route('/')
.get(thoughtController.getAllThoughts)
.post(thoughtController.createThought);

router.route('/:thoughtId')
.get(thoughtController.getThoughtById)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
.post(thoughtController.addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(thoughtController.deleteReaction);



module.exports = router;