import mongoose from "mongoose";
const schema = mongoose.Schema({
    userName:String,
    planNumber: Number,
    email:String,
},{collection:'test'})

export default schema;