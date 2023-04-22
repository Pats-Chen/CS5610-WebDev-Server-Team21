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


export const updateTravelPlan = async (pId, updates) => {
   // console.log(pId);
   // console.log(updates);
   return TravelModel.updateOne({_id: pId}, {$set: updates});
}
export const findTravelPlanbyID = async (pId) =>
    TravelModel.findOne({_id:pId});

export const deletePlanByPlanID = async (pid)=>{
   return  TravelModel.deleteOne({_id: pid});
}
export const findAllTravelPlanByUser = async (userId) => {
   return TravelModel.find({planCreator: userId});
}
export const getRecommendation = async () => {
   const results = await TravelModel.aggregate([
      {
         $lookup: {
            from: 'users',
            localField: 'planOwner',
            foreignField: '_id',
            as: 'planOwner'
         }
      },
      {
         $match: {
            'planOwner.userStatus': 'premium'
         }
      },
      {
         $sample: { size: 6 }
      }
   ]).exec();
   console.log(results);
   return results;

}

export const adminFind = async (userId) => {
   return TravelModel.find();
}