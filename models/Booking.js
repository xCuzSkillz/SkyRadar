const mongoose = require("mongoose")

const BookingShcema = new mongoose.Schema({
    userId: {
        type:  mongoose.Types.ObjectId,
        ref: "User"
    }, 
    flightId: {
        type:  mongoose.Types.ObjectId,
        ref: "Flight"
    },
    tripId: {
        type: String
    },
    tripType: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed", "refunded"]
    },
    totalPrice: {
        type: Number,
        min: 10,
        max: 9000
    },
    bookedAt: {
        type: Date
    }
}, {timestamps: true})

const Booking = mongoose.model("Booking", BookingShcema)

module.exports = Booking;