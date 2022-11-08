const Room = require('../modal/roomModal');
const Hotel = require('../modal/hotelModal');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const ErrorHandler = require('../utils/ErrorHandler')


// CREATE 

exports.createRoom= asyncErrorHandler(async(req,res,next)=>{
    const hotelId = req.params.hotelId;
  
    const room = await Room.create(req.body);

    await Hotel.findByIdAndUpdate(hotelId, {$push:{rooms:room._id}});

    res.status(200).json({
        success : true,
        room 
    })
})


//UPDATE

exports.updateRoom=asyncErrorHandler(async(req,res,next)=>{
    let room = await Room.findById(req.params.id)
    if(!room){
        return next(new ErrorHandler("Room not found!" ,401))
        
    }
    room = await Room.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})

    res.status(201).json({
        success : true,
        room
    })


})


//DELETE

exports.deleteRoom=asyncErrorHandler(async(req,res,next)=>{
    const hotelId = req.params.hotelId
    let room = await Room.findById(req.params.id)
    if(!room){
        return next(new ErrorHandler("Room not found!", 402))
        
    }
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, {$pull:{rooms:req.params.id}})

    res.status(201).json({
        success : true,
        message : "Room Deleted"
    })


})


//GET

exports.getRoom=asyncErrorHandler(async(req,res,next)=>{
    let room = await Room.findById(req.params.id)
    if(!room){
        return next(new ErrorHandler("Room not found!",402))
        
    }
  

    res.status(201).json({
        success : true,
        room
    })


})

// GETALL

exports.getAllRoom=asyncErrorHandler(async(req,res,next)=>{
    let rooms = await Room.find()
  

    res.status(201).json({
        success : true,
        rooms
    })


})


//UPDATE ROOM AVAILABLITY

exports.updateRoomAvailablity=asyncErrorHandler(async(req,res,next)=>{
   
    room = await Room.updateOne({"roomNumbers._id": req.params.id},{
        $push:{
            "roomNumbers.$.unavaibleDates":req.body.dates
        }
    })

    res.status(201).json({
        success : true,
        
    })


})