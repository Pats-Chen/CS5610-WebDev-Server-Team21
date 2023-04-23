import mongoose from "mongoose";

const PlanSchema = mongoose.Schema({
                                        // planId: {type: mongoose.Schema.Types.ObjectId, required: true},
                                        userId: {type: mongoose.Schema.Types.ObjectId, required: true},
                                        planName: {type: String, required: true},
                                        planDescription: String,
                                        planOwner: mongoose.Schema.Types.ObjectId,
                                        locations: [{
                                            address: String,
                                            location: {
                                                lat: Number,
                                                lng: Number
                                            },
                                            name: String,
                                            placeId: String,
                                        }]
                                    }, {collection: 'plans'})

export default PlanSchema;