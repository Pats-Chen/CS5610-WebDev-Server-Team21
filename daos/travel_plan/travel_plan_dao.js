import mongoose from "mongoose";
import TravelPlan from "./travel_plan.js";
const TravelModel = mongoose.model('TravelPlan', TravelPlan);
export const createTravelPlan = async (planmodel) =>
    TravelModel.create(planmodel);


export const deleteTravelPlan = async (uid)=>{
   return  TravelModel.deleteOne({planCreator: {$eq: uid}});
}


export const findAllUsersTravelPlan = async (uid) =>
        TravelModel.findOne({planCreator: {$eq: uid}}).sort({ _id: -1 });