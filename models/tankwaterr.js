const mongoose = require("mongoose");

const waterFlowSchema = new mongoose.Schema({
    tankwaterflowId: {
        type: String,
        required:true
    },
    
})