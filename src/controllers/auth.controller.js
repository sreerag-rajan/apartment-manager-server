require("dotenv").config();
// const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/auth.model")
const router = express.Router();

const newToken = (user)=>{
    return jwt.sign(user, process.env.JWT_SECRET_KEY);
}
const newTokenregister = (user)=>{
    return jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
}

router.post("/register", async (req,res)=>{
    try{
        let user = await User.findOne({"email": req.body.email});
        if(user){
            return res.status(400).send("User Exists");
        }

        user = await User.create(req.body);
        const token= newTokenregister(user);
        return res.status(201).setHeader("Authorization",`Bearer ${token}`).send({user, token});

    }catch(er){
        return res.status(500).send(er.message);
    }
})

router.post("/login", async (req,res)=>{
    try{
        let user = await User.findOne({email: req.body.email}).lean().exec();
        if(!user) return res.status(400).send("Incorrect Email or Password");

        const match = bcrypt.compareSync(req.body.password, user.password);
        if(!match) return res.status(400).send("Incorrect Email or Password");
        const token = JSON.stringify(newToken(user));
        
        return res.status(201).setHeader("Authorization", `Bearer ${token}`).send({user, token});

    }catch(er){
        return res.status(500).send(er.message);
    }
})


module.exports = router;