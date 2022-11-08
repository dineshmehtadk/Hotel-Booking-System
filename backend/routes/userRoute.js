const express = require('express');
const { updateUser, deleteUser, getUser, getAllUser } = require('../controller/userController');
const { isAuthenticatedUser, autharizeRole } = require('../middleware/isAuth');


const router = express.Router();



router.route('/:id').put(isAuthenticatedUser, autharizeRole("isAdmin"),updateUser).delete(isAuthenticatedUser, autharizeRole("isAdmin"), deleteUser).get(isAuthenticatedUser,autharizeRole("isAdmin"),getUser);
router.route("/").get(isAuthenticatedUser, autharizeRole("isAdmin"), getAllUser);




module.exports =router;