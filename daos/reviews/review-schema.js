import mongoose from "mongoose";


const ReviewSchema = mongoose.Schema({
    planId: {type: mongoose.Schema.Types.ObjectId, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserModel'},
    authorName: {type: String, required: true},
    authorImg: String,
    content: {type: String, required: true},
    score: {type: Number, enum: [1, 2, 3, 4, 5], default: 5},
    date: {type: Date, default: Date.now}
}, {collection: 'reviews'})


export default ReviewSchema;