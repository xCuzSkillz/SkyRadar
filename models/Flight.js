const mongoose = require("mongoose")

const FlightShcema = new mongoose.Schema({
    airlineId: {
        type: mongoose.Types.ObjectId,
        ref: "Airline"
    },
    flightNumber: {
        type: String,
        required: true,
    },
    origin: {
       type: String,
        required: true, 
    },
    destination: {
        type: String,
        trim: true,
        required: true
    },
    departureTime: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
    },
    stops: {
        type: Number
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 9000
    },
    totalSeats: {
        type: Number
    },
    seatsAvailable: {
        type: Number
    }
}, {timestamps: true})

const Flight = mongoose.model("Flight", FlightShcema)

module.exports = Flight;