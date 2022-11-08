const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    rooms:{
        type:[String],
        
    },
    featured:{
        type:Boolean,
        default: false
        
    },
    title:{
        type:String,
        required:true
        
    },


})

module.exports = mongoose.model("Hotel", HotelSchema)