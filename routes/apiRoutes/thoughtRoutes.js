const router = require('express').Router();     
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController'); 


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