const mongoose = require("mongoose");

const waterLevelSchema = new mongoose.Schema({
    tankId: {
        type: String,
        required:true
    },
    
})