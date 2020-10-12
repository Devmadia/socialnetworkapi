const router = require('express').Router();

const { route } = require('..');
// import functions for thought controller
const {
    getAllThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

// api for thoughts
router.route('/')
    .get(getAllThoughts);

// api thoughts/:id
router.route('/:id')
    .get(getThoughtbyID)
    .put(updateThought)
    .delete(deleteThought);

// api thoughts/:userId
router.route('/:userId')
    .post(createThought);

// api thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// api thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;