const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    airlineId: {
        type: mongoose.Types.ObjectId,
        ref: "Airline"
    },
    rating: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    comment: {
        type: String,
        mingLength: 3,
        maxLength: 500,
    },
    createdAt: {
        type: Date
    }
}, { timestamps: true })

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review;