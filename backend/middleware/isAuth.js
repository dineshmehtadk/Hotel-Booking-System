const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const ErrorHandler = require('../utils/ErrorHandler');

const jwt = require("jsonwebtoken")
const User = require("../modal/userModal")


exports.isAuthenticatedUser = asyncErrorHandler (async (req, res, next)=>{
    const {token} = req.cookies;

    
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401))

    }

    const decodedData = jwt.verify(token, process.env.JWTSECRET)
  

    req.user = await User.findById(decodedData.id)

    next();
})

exports.autharizeRole = ()=>{
  
    return(req, res, next)=>{
        if(!req.user.isAdmin ){
            return next(new ErrorHandler(
                `isAdmin:User is not allowed to access this resource`, 403
            )
            )}

        next()

    }
}