const express = require('express');
const { addNewHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms,  } = require('../controller/hotelController');
const { isAuthenticatedUser, autharizeRole } = require('../middleware/isAuth');

const router = express.Router();


router.route("/add").post(isAuthenticatedUser, autharizeRole("admin"),addNewHotel);
router.route("/:id").put(isAuthenticatedUser,autharizeRole, updateHotel).delete(isAuthenticatedUser, autharizeRole("admin") ,deleteHotel).get(getHotel)
router.get("/" ,getAllHotel);

router.get("/filter/countByCity", countByCity);
router.get("/filter/countByType", countByType);
router.get("/room/:hotelId", getHotelRooms)


module.exports =router;