import mongoose from "mongoose";
import UserSchema from "./user-schema.js";
const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;