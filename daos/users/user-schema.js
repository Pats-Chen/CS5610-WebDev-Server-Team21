import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    website: String,
    location: String,
    emailAddress: {type: String, required: true},
    phoneNumber: String,
    dateOfBirth: String,
    profileImage: String,
    bio: String,
    followers: Number,
    following: Number,
    paidSubscriber: {type: String, required: true},
    planNumber: Number,
    followingList: [],
    followersList: [],
    planList: [],
}, {collection: 'users'})

export default UserSchema;