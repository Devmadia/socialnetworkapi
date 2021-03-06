// import user model
const { User } = require('../models');
const { db } = require('../models/User');

// controller for user
const userController = {
    // to get all users
    getAllUsers(req,res) {
        User.find({})
        // populate thoughts
        .populate({
            path: 'thoughts',
            select: '-__v'
        })

        // populate friends
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by an id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // will return if no user is found
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // find and update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    // add friends to friends' list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true}
        )
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // find a user and delete
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete friend from friends' list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId}},
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);   
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;