
const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom, updateRoomAvailablity } = require('../controller/roomController');
const { isAuthenticatedUser, autharizeRole } = require('../middleware/isAuth');

const router = express.Router();


router.route("/add/:hotelId").post(isAuthenticatedUser,autharizeRole("isAdmin"),createRoom);
router.route("/:id").put( isAuthenticatedUser,autharizeRole("isAdmin"),updateRoom).get(getRoom);
router.route("/availablity/:id").put(updateRoomAvailablity)
router.route("/").get(getAllRoom);
router.route("/:id/:hotelId").delete(isAuthenticatedUser,autharizeRole("isAdmin"),deleteRoom)


module.exports =router;