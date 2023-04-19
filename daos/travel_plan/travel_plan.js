import mongoose from "mongoose";

const TravelPlan = mongoose.Schema({
    planCreator: {type: String, required: true},
    planOwner: {type: String, required: true},
    planName: {type: String, required: true},
    planDescription: {type: String},
    locations: [
        {
            address: {type: String, required: true},
            location: {
                lat: {type: Number},
                lng: {type: Number}
            },
            name: {type: String, required: true},
            placeId: {type: String, required: true}
        }
    ]
}, {
    collection: 'plans'
});

export default TravelPlan;