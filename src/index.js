require("dotenv").config();
const cors = require("cors")
const express = require("express");
const dbConnect = require("./configs/db")

const authController = require("./controllers/auth.controller")

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use("/auth", authController)


app.listen(process.env.PORT||2345, ()=>{
    dbConnect()
    console.log("listening on port 2345")
})