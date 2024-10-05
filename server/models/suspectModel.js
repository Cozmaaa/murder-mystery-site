const mongoose = require('mongoose');

const suspectSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    faceImage:{
        type:String,
        required:true,
    },
    level:{
        type:Number,
        required:true,
    },
    isGuilty:{
        type:Boolean,
        required:true,
    },
    prompt:{
        type:String,
        required:true,
    }
})

const Suspect = mongoose.model('Suspect',suspectSchema);

module.exports=Suspect;