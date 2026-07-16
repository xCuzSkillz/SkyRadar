const mongoose = require("mongoose")

const AirlineSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
}, {timestamps: true})

const Airline = mongoose.model("Airline", AirlineSchema)

module.exports = Airline;