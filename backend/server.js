const app = require('./app');
const connectDatabase = require('../backend/config/database')


//connect database 


connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is connected http:localhost:${process.env.PORT}`)
})