const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");

const memberSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:String,
        
    },
    address:{
        type:String,
    },
    membership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'membership',
        required:true,
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'gym',
        required:true,
    },
    profilepic:{
        type:String,
        required:true,
    },
    status:{
        type:String,
       default:"Active",
    },
    lastPyment:{
        type:Date,
        default:new Date()
    },
    nextBillDate:{
        type:Date,
        required:true
    }
},{timestamps:true})

const memberModal = mongoose.model("member",memberSchema);
module.exports = memberModal;