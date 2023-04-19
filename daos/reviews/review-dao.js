import ReviewModel from "./review-model.js";


export const findReview = async (rId) =>
    ReviewModel.find({_id:rId});

export const findAllReviewByPlanId = async (planId) =>
    ReviewModel.find({planId:planId});

export const findAllReviewByAuthor = async (authorId) =>
    ReviewModel.find({authorId:authorId});

export const deleteReview = async (rId) =>
    ReviewModel.deleteOne({_id:rId});

export const createReview = async (review) =>
    ReviewModel.create(review);

export const updateReview = (rid, review) =>
    ReviewModel.updateOne({_id: rid}, {$set: review});