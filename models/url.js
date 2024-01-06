const mongoose = require("mongoose");   //mongoose used in making models
const urlSchema = new mongoose.Schema({
    shortId : {
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl : {
        type:String,
        required:true,
    },
    visitHistory : [ {timestamp:{type:Number}}],
},{timestamps:true});

const URL =  mongoose.model("url",urlSchema); // url (collection)
module.exports = URL;