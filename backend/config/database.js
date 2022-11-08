const mongoose = require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.URI).then((data)=>{
        console.log(`Mongodb runing on port ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })

}

module.exports = connectDatabase