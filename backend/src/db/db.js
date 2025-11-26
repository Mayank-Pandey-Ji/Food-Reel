 const mongoose = require('mongoose');

 function connectDB() {
    mongoose.connect(`${process.env.MONGODB_URI}/food`)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log("mongoDB Connection error :" , err)
    })
 }

module.exports = connectDB;