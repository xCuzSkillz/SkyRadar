const mongoose = require("mongoose")

const SeatSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Types.ObjectId,
        ref: "Flight"
    },
    seatNumber: {
        type: String
    },
    class: {
        type: String,
        enum: ["economy", "business", "first"]
    },
    isBooked: {
        type: Boolean
    },
}, { timestamps: true })

const Seat = mongoose.model("Seat", SeatSchema)

module.exports = Seat;