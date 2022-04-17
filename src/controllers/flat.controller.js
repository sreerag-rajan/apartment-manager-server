const express = require("express");
const Flat = require("../models/flat.model")
const Resident = require("../models/resident.model")
const router = express.Router();

router.post("/", async (req,res)=>{
    try{
        const flat = await Flat.create(req.body)
        return res.status(201).send(flat);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})



router.get("/", async (req,res)=>{
    try{
        let {q, filter, sort, page} = req.query;
        

        let flats = await Flat.find().lean().exec()

        if(q){
            flats = flats.filter((el)=>{
                if(el.block.toUpperCase()===q.toUpperCase()){
                    return flats;
                }
            })
        }

        if(filter){
            flats = flats.filter((el)=>{
                if(el.residentType===filter){
                    return el;
                }
            })
        }

        if(sort){
            if(sort==="asc"){
                flats = flats.sort((a,b)=>a.number-b.number);
            }
            else{
                flats = flats.sort((a,b)=>b.number-a.number);
            }
        }
        page = req.query.page || 1;
        let size = 5;
        let lowerlim = (page-1)*5;
        let upperlim = lowerlim+5;
        flats = flats.filter((el,i)=>{
            if(i>=lowerlim && i<upperlim){
                return el;
            }
        })
        console.log(flats)

        return res.status(200).send(flats);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})

router.get("/allflats", async(req,res)=>{
    try{
        const flats = await Flat.find().lean().exec();

        return res.status(200).send(flats);
        
    }catch(er){
        return res.status(500).send(er.message)
    }
    
})
router.get("/:id", async (req,res)=>{
    try{
        const flat = await Flat.findById(req.params.id).lean().exec()

        return res.status(200).send(flat);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})
router.patch("/:id", async (req,res)=>{
    try{
        const flat = await Flat.findByIdAndUpdate(req.params.id,req.body).lean().exec();
        return res.status(202).send(flat);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})
router.delete("/:id", async (req,res)=>{
    try{
        const flat = await Flat.findByIdAndDelete(req.params.id).lean().exec();
        const residents = await Resident.deleteMany({flat:req.params.id}).lean().exec()
        return res.status(202).send({flat, residents});
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})


module.exports = router;