require("dotenv").config()
const mongoose = require("mongoose");

module.exports = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
    }
    catch(er){
        console.log(er)
    }
    
}