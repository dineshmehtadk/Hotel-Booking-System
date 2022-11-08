const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const Hotel = require('../modal/hotelModal');
const Room = require('../modal/roomModal');
const ErrorHandler = require('../utils/ErrorHandler')


// CREATE 

exports.addNewHotel=asyncErrorHandler(async(req,res,next)=>{
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
        success : true,
        hotel
    })


})


//UPDATE

exports.updateHotel=asyncErrorHandler(async(req,res,next)=>{
    let hotel = await Hotel.findById(req.params.id)
    if(!hotel){
        return next(new ErrorHandler(402, "Hotel not found!"))
        
    }
    hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(201).json({
        success : true,
        hotel
    })


})


//DELETE

exports.deleteHotel=asyncErrorHandler(async(req,res,next)=>{
    let hotel = await Hotel.findById(req.params.id)
    if(!hotel){
        return next(new ErrorHandler("Hotel not found!",402))
        
    }
     await hotel.remove()

    res.status(201).json({
        success : true,
        message : "Hotel Deleted"
    })


})


//GET

exports.getHotel=asyncErrorHandler(async(req,res,next)=>{
    let hotel = await Hotel.findById(req.params.id)
    if(!hotel){
        return next(new ErrorHandler("Hotel not found!",402))
        
    }
  

    res.status(201).json({
        success : true,
        hotel
    })


})

// GETALL

exports.getAllHotel=asyncErrorHandler(async(req,res,next)=>{
    const {min, max,...otherQuery} = req.query
    let hotels = await Hotel.find({...otherQuery, cheapestPrice:{$gt:min||1, $lt:max||1000}}).limit(req.query.limit)
  

    res.status(201).json({
        success : true,
        hotels
    })


})


// GeT BY CITY

exports.countByCity=asyncErrorHandler(async(req,res,next)=>{
    const cities = req.query.cities.split(",")
  

    const list = await Promise.all(cities.map(city =>{
        return Hotel.countDocuments({city:city})
    }))
  

    res.status(201).json({
        success : true,
        list
    })


});

// GeT BY HOTEL TYPE

exports.countByType=asyncErrorHandler(async(req,res,next)=>{
    const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apartmentCount =await Hotel.countDocuments({type:"apartment"})
    const resortCount =await Hotel.countDocuments({type:"resort"})
    const villaCount =await Hotel.countDocuments({type:"villa"})
    const cabinCount =await Hotel.countDocuments({type:"cabin"})
  
  

    res.status(201).json([
        {type:"hotel", count:hotelCount},
        {type:"apartment", count:apartmentCount},
        {type:"resort", count:resortCount},
        {type:"villa", count:villaCount},
        {type:"cabin", count:cabinCount},
    ]
    )


})


exports.getHotelRooms =asyncErrorHandler(async (req, res, next) => {

    let hotel = await Hotel.findById(req.params.hotelId.trim())
    if(!hotel){
        return next(new ErrorHandler("Hotel not found!",402))
        
    }
  

      const list = await Promise.all(
        hotel.rooms.map((room) => {
    
          return Room.findById(room);
        })
      );
      console.log(list)
   
      res.status(200).json(list)

  });

