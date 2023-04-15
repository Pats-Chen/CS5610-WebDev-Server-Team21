import mongoose from "mongoose";
import testSchema from "./test-schema.js";
const testModel = mongoose.model('testModel',testSchema);

export default  testModel