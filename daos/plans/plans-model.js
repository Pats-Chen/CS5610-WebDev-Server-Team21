import mongoose from "mongoose";
import PlanSchema from "./plan-schema.js";
//create PlanModel to interact with mongoose database
const PlansModel = mongoose.model('PlansModel', PlanSchema);
export default PlansModel;