const arrayUniquePlugin = require('mongoose-unique-array');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {   username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        
        email: {
            type: String,
            required: 'Email address is required!',
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                unique: false,
            },
        ],
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,

    }
    
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.virtual('thoughtCount').get(function () {
    return this.thoughts.length;
});


const User = model('User', userSchema);

module.exports = User;