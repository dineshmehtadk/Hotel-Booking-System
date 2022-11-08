const sendToken = (user, statusCode, res)=>{

  const token = user.getJWTToken();
  
  
  // options for cookies
  const options = {
      expires : new Date(
          Date.now() + 5 * 24 * 60*60 * 1000
          ),
      httpOnly: true
  };

  
  

  res.status(statusCode).cookie("token", token, options).json({
      success:true,
      user,
      token,
  }
  )
}

module.exports = sendToken;


exports.verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new ErrorHandler("You are not authorized!", 403));
    }
};

exports.verifyAdmin = (req, res, next) => {
    
    if(req.user.isAdmin){
        next()
    }
    else {
        return next(new ErrorHandler("You are not authorized!", 403));
      }

    


};