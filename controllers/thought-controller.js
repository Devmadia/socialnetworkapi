// import thought and comment models
const { Thought, Comment } = require('../models');

const thoughtController = {
    // to get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        // sort by id
        .sort({ _id: -1 })
        .then(dbthoughtData => res.json(dbthoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // to get thoughts by an ID
    getThoughtbyID({ params }, res) {
        Thought.findOne({ _id: params.id })
    }
}