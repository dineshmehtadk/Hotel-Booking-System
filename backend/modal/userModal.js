const mongoose = require("mongoose");
const jwt  =require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    isAdmin:{
        type:Boolean,
        default:false
        
    }
},
    {timestamps:true}


)

// JWT Token
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWTSECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
};


module.exports = mongoose.model("User", UserSchema)