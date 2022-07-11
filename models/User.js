const { Schema, model } = require("mongoose");

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
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
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

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;