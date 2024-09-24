const mongoose = require("mongoose");
const {Schema} = mongoose;

const CrudSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mob:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
});

module.exports = mongoose.model("crud",CrudSchema)