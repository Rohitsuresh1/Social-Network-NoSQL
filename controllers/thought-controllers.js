const { Thought, User } = require('../models');

const thoughtController = {
    createThought({body},res) {
        Thought.create((body))
        .then(({_id}) => {
            console.log(body);
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(dbData => {
            if(!dbData){
                return res.status(404).json({message:'No user found with this id!'});
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getAllThoughts(req,res) {
        Thought.find({})
        .populate('reactions')
        .select('-__v')
        .sort({_id:-1})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({params},res) {
        Thought.findOne({_id:params.id})
        .populate({path:'reactions',select:'-__v'})
        .select('-__v')
        .sort({_id:-1})
        .then(dbData => {
            if(!dbData){
                return res.status(404).json({message:'No thoughts found with this id!'});
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
        .then((dbData) => {
            if(!dbData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id:params.id})
        .then((dbData) => {
            if(!dbData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json({message:'Following record has been deleted!',dbData});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addReaction({params,body},res){
        Thought.findOneAndUpdate({_id:params.thoughtId},{$addToSet:{reactions:body}},{new:true,runValidators:true})
        .then((dbData) => {
            if(!dbData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json({message:'Following record has been updated!',dbData});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    deleteReaction({params},res){
        Thought.findOneAndUpdate({_id:params.thoughtId},{$pull:{reactions:{reactionId:params.reactionId}}},{new:true})
        .then((dbData) => {
            if(!dbData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json({message:'Following record has been updated!',dbData});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

};

module.exports =thoughtController;