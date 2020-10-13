const router = require('express').Router();

// import controller functions
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');

// /api for /users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api for /users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api for /users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)

module.exports = router; 