import testModel from "./test-model.js";

export const findAllTestUser = () => testModel.find();
export const createTestUser = (user) => testModel.create(user);
export const deleteTestUser = (uId) => testModel.deleteOne({_id: uId});
export const updateUser = (uid, update) => testModel.updateOne({_id: uid}, {$set: update})

