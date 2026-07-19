const mongoose = require("mongoose")

const SavedFlightSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },  
    flightId: {
        type: mongoose.Types.ObjectId,
        ref: "Flight"
    },
    savedAt: {
        type: Date
    }
}, { timestamps: true })

const SavedFlight = mongoose.model("SavedFlight", SavedFlightSchema)

module.exports = SavedFlight;