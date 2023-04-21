import mongoose from "mongoose";

const TravelPlan = mongoose.Schema({
    planCreator: {type: String, required: true},
    planOwner: {type: String, required: true},
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
            timeOfStay: {type: Number, required: true}
        }
    ]
}, {
    collection: 'plans'
});

export default TravelPlan;