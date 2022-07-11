const router = require('express').Router();

const { getAllThoughts,createThought,getThoughtById,updateThought,deleteThought,createReaction,deleteReaction } = require ('../../controllers/thought-controllers');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').put(updateThought).get(getThoughtById).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;