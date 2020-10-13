// import dependencies
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const { create } = require('./User');

// reaction is a subdoc of thought
const ReactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => moment(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
{
    toJSON: {
        getters: true
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },

    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;