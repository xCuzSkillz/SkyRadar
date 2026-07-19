const mongoose = require("mongoose")

const PassengerSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    },
    seatId: {
        type: mongoose.Types.ObjectId,
        ref: "Seat"
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    passportNumber: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Passenger = mongoose.model("Passenger", PassengerSchema)

module.exports = Passenger;