require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/auth.model")
const router = express.Router();

const newToken = (user)=>{
    return jwt.sign(user, process.env.JWT_SECRET_KEY);
}

router.post("/register", async (req,res)=>{
    try{

        let user = await User.findOne({"email": req.body.email});
        if(user){
            return res.status(400).send("User Exists");
        }

        user = await User.create(req.body);
        const token= newToken(user);
        return res.status(201).setHeader("Authorization",`Bearer ${token}`).send({user, token});

    }catch(er){
        return res.status(500).send(er.message);
    }
})

router.post("/login", async (req,res)=>{
    try{
        let user = await User.findOne({email: req.body.email}).lean().exec();
        if(!user) return res.status(400).send("Incorrect Email or Password");

        const match = user.checkPassword(req.body.password);
        if(!match) return res.status(400).send("Incorrect Email or Password");

        const token = newToken(user);
        return res.status(201).setHeader("Authorization", `Bearer ${token}`).send({user, token});

    }catch(er){
        return res.status(500).send(er.message);
    }
})


module.exports = router;