const router = require('express').Router();

const { getAllThoughts,createThought,getThoughtById,updateThought,deleteThought,addReaction,deleteReaction } = require ('../../controllers/thought-controllers');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').put(updateThought).get(getThoughtById).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;