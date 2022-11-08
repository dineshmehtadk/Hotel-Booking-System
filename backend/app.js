
const express = require('express');
const dotenv = require('dotenv');

const middleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")




/// config 

dotenv.config({path:"backend/config/config.env"})



const app= express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    sameSite: 'none'
}))
app.use(bodyParser.urlencoded({extended:true}))




// Routes 
const hotelRoute = require('./routes/hotelRoute');
const authroute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');


app.use('/api/', authroute);
app.use('/api/hotel/', hotelRoute);
app.use('/api/user/', userRoute);
app.use('/api/room/', roomRoute);



// middleware

app.use(middleware)

module.exports = app