const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    residentType : {type: String, required:true},
    block: {type: String, required:true},
    number : {type: String, required:true},
    numberOfResidents: {type:Number, required:true},
    createdUser: {type: mongoose.Schema.Types.ObjectId, ref:"user", required:true}
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("flat", flatSchema);