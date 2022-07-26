const {addUser} = require('./addUser.controller');
const {deleteUserById} = require('./deleteUserById.controller');
const {getUserById} = require('./getUserById.controller');
const {loginUser} = require('./loginUser.controller');
const {updateUserById} = require('./updateUserById.controller');
const { validateUserData } = require('./validation.controller');

module.exports = {
    addUser,
    deleteUserById,
    getUserById,
    loginUser,
    updateUserById,
    validateUserData
}