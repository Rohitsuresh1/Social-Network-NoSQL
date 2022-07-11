const router = require('express').Router();

const { getAllThoughts,createThought,getThoughtById,updateThought,deleteThought } = require ('../../controllers/thought-controllers');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').put(updateThought).get(getThoughtById).delete(deleteThought);



module.exports = router;