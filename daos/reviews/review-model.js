import mongoose from "mongoose";
import ReviewSchema from "./review-schema.js";
//create UserModel to interact with mongoose database
//name of model can be used as ref name in another Schema
const ReviewModel = mongoose.model('ReviewModel', ReviewSchema);
export default ReviewModel;