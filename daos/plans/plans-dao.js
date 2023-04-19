import PlansModel from "./plans-model.js";

export const findPlan = async (pId) =>
    PlansModel.findOne({_id:pId});

export const findAllPlanByUserId = async (userId) =>
    PlansModel.find({userId:userId});

export const deletePlan = async (pId) =>
    PlansModel.deleteOne({_id:pId});

export const createPlan = async (plan) =>
    PlansModel.create(plan);

export const updatePlan = (pid, plan) =>
    PlansModel.updateOne({_id: pid}, {$set: plan});