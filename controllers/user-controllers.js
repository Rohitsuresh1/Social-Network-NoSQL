const { User, Thought } = require('../models');

const userController = {
    
    createUser({body},res) {
        User.create(body)
        .then((dbData)=> res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

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

    getUserById({ params }, res) {
        User.findOne({_id:params.id})
        .populate({path: 'thoughts',select: '-__v'})
        .populate('friends')
        .select('-__v')
        .sort({_id:-1})
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

    updateUser({params,body},res) {
        User.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
        .then((dbData) => {
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

    deleteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then((dbData) => {
            if(!dbData){
                return res.status(404).json({message:'No user found with this id!'});
            }
            Thought.deleteMany({username:dbData.username})
            .then(res.json({message:'Followind data has been deleted', dbData}))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addFriend({params},res){
        User.findOneAndUpdate({_id:params.userId},{$push:{friends:params.friendId}},{new:true, runValidators:true})
        .then((dbData) => {
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

    deleteFriend({params},res) {
        User.findOneAndUpdate({_id:params.userId},{$pull:{friends:params.friendId}})
        .then((dbData)=>{
            if(!dbData){
                return res.status(404).json({message:'No user found with this id!'});
            }
            res.json({message:'Followind data has been deleted', dbData})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
};

module.exports = userController;