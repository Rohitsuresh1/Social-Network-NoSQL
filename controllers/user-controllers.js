const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req,res) {
        User.find({})
        .populate({path: 'thoughts',select: '-__v'})
        .populate('friends')
        .select('-__v')
        .sort({_id:-1})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // getUserById({ params }, res) {
        
    // }

    createUser({body},res) {
        User.create(body)
        .then((dbData)=> res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

};

module.exports = userController;