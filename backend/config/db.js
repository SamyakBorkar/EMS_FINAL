const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const connextion = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected successfully")
    }
    catch(error){
        console.error(`ERROR: ${error.message}`)
        process.exit(1);
    }
};

module.exports = connectDB;