const mongoose = require("mongoose")

const seatsInPattern = (pattern) => pattern.split("").filter(ch => ch !== " ").length

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
    image: {
        type: String,
    },
    layout: [CabinSectionSchema],
}, { timestamps: true })

PlaneTypeSchema.virtual("totalSeats").get(function () {
    return this.layout.reduce((sum, section) => sum + section.rows * seatsInPattern(section.seatPattern), 0)
})

const PlaneType = mongoose.model("PlaneType", PlaneTypeSchema)

module.exports = PlaneType;
