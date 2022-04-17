require("dotenv").config();

const express = require("express");
const dbConnect = require("./configs/db")

const app = express();



app.listen(process.env.PORT||2345, ()=>{
    dbConnect()
    console.log("listening on port 2345")
})