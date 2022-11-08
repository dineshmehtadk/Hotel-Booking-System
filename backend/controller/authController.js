const jwt = require('jsonwebtoken');

const verifyToken = require("../utils/verifyToken")

const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const User = require('../modal/userModal');
const ErrorHandler = require('../utils/ErrorHandler');

const bcrypt = require('bcryptjs')


// LOGING
exports.login=asyncErrorHandler(async(req,res,next)=>{
    let user = await User.findOne({username: req.body.username});
    if(!user){
        return next(new ErrorHandler("User not Found!" ,401) )

    }

    const isPasswordMatched = await bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect password!" , 401))
    }

        
    // const {password, isAdmin, ...otherDetails} = user._doc;
    // user = otherDetails


    verifyToken(user, 201, res)

  
  

  
       

});


// REGISTER


exports.register=asyncErrorHandler(async(req,res,next)=>{

    const {username,password, email} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await User.create({
        username,
        email,
        password : hash

    });

    res.status(201).json({
        success : true,
        user
    })

    


});


// LOGOUT 

exports.logout=asyncErrorHandler(async(req,res,next)=>{
    res.cookie("access_token",null,{httpOnly: true})

    res.status(201).json({
        success : true,
        message :"Logout Successfully"
    })

});

