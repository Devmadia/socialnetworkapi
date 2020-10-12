const { Schema, model, SchemaType } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/] // matching a valid email address
    },
    
    thoughts: [  // subdocument for thoughs
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought' // referencing though doc model
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  // referencing user doc model
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },

    id: false
});

// virtual to count friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;