const mongoose = require("mongoose")

const CabinSectionSchema = new mongoose.Schema({
    class: {
        type: String,
        enum: ["economy", "business", "first"],
        required: true,
    },
    rows: {
        type: Number,
        required: true,
        min: 1,
    },
    seatPattern: {
        type: String,
        required: true,
    },
})

const PlaneTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
    },
    totalSeats: {
        type: Number,
    },
    image: {
        type: String,
    },
    layout: [CabinSectionSchema],
}, { timestamps: true })

const PlaneType = mongoose.model("PlaneType", PlaneTypeSchema)

module.exports = PlaneType;
