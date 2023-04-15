import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    paidSubscriber: {type: String, required: true},
    planNumber: Number,
}, {collection: 'test'})

export default UserSchema;