const routerUser = require('express').Router();
const { userDataValidate } = require('../utils/validate');
const { getUserMe, updateUser } = require('../controllers/users');

routerUser.get('/me', getUserMe);
routerUser.patch('/me', userDataValidate, updateUser);

module.exports = routerUser;
