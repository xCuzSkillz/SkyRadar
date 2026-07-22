const mongoose = require("mongoose")

const FlightShcema = new mongoose.Schema({
    airlineId: {
        type: mongoose.Types.ObjectId,
        ref: "Airline"
    },
    planeTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "PlaneType"
    },
    promoCodeId: {
        type: mongoose.Types.ObjectId,
        ref: "PromoCode"
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
    economyPrice: {
        type: Number,
        min: 10,
        max: 9000
    },
    businessPrice: {
        type: Number,
        min: 10,
        max: 9000
    },
    firstPrice: {
        type: Number,
        min: 10,
        max: 9000
    }
}, {timestamps: true})

const Flight = mongoose.model("Flight", FlightShcema)

module.exports = Flight;