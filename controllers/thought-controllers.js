const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req,res) {
        Thought.find({})
        .populate('reaction')
        .select('-__v')
        .sort({_id:-1})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({body},res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findByIdAndUpdate(
                { _id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((dbData) => {
            if(!dbData) {
                res.status(404).json({ message: 'No users found with this id!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
};

module.exports =thoughtController;