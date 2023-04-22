import mongoose from "mongoose";

const TravelPlan = mongoose.Schema({
    planCreator: {type: mongoose.Schema.Types.ObjectId, required: true},
    planOwner: {type: mongoose.Schema.Types.ObjectId, required: true},
    planName: {type: String, required: true},
    planDescription: {type: String},
    locations: [
        {
            placeId: {type: String, required: true},
            name: {type: String, required: true},
            address: {type: String, required: true},
            location: {
                lat: {type: Number},
                lng: {type: Number}
            },
            timeOfStay: {type: Number}
        }
    ]
}, {
    collection: 'plans'
});

export default TravelPlan;