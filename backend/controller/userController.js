const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const User = require('../modal/userModal');
const ErrorHandler = require('../utils/ErrorHandler')




//UPDATE

exports.updateUser=asyncErrorHandler(async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found!",401))
        
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(201).json({
        success : true,
        user
    })


})


//DELETE

exports.deleteUser=asyncErrorHandler(async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found!", 402))
        
    }
     await user.remove()

    res.status(201).json({
        success : true,
        message : "User Deleted"
    })


})


//GET

exports.getUser=asyncErrorHandler(async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User not found!", 402))
        
    }
  
    res.status(201).json({
        success : true,
        user
    })


})

// GET ALL

exports.getAllUser=asyncErrorHandler(async(req,res,next)=>{
    let users = await User.find()
  

    res.status(201).json({
        success : true,
        users
    })


})