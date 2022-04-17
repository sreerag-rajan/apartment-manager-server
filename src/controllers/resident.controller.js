const express = require("express");
const Resident = require("../models/resident.model")
const Flat = require("../models/flat.model")
const router = express.Router();

router.post("/", async (req,res)=>{
    try{
        const resident = await Resident.create(req.body)
        let flat = await Flat.findById(req.body.flat).lean().exec();
        flat.numberOfResidents+=1;
        flat = await Flat.findByIdAndUpdate(req.body.flat, flat).lean().exec();
        return res.status(201).send({resident,flat});
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})

router.get("/", async (req,res)=>{
    try{
        const residents = await Resident.find().lean().exec()

        return res.status(200).send(residents);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const resident = await Resident.findById(req.params.id).lean().exec()

        return res.status(200).send(resident);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})
router.get("/flat/:id", async (req,res)=>{
    try{
        const resident = await Resident.find({flat:req.params.id}).populate("flat").lean().exec()

        return res.status(200).send(resident);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})
router.patch("/:id", async (req,res)=>{
    try{
        const resident = await Resident.findByIdAndUpdate(req.params.id,req.body).lean().exec();
        return res.status(202).send(resident);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})
router.delete("/:id", async (req,res)=>{
    try{
        console.log(req.params.id)
        let resident = await Resident.findById(req.params.id).lean().exec()
        console.log(resident.flat)
        let flat = await Flat.findById(resident.flat).lean().exec();
        flat.numberOfResidents-=1;
        flat = await Flat.findByIdAndUpdate(resident.flat, flat).lean().exec();
        resident = await Resident.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send({resident,flat});
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})

module.exports = router;