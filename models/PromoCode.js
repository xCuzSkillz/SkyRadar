const mongoose = require("mongoose")

const PromoCodeShcema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    discountPercent: {
        type: Number
    },
    expiryDate: {
        type: Date
    },
    usageLimit: {
        type: Number
    },
    timesUsed: {
        type: Number
    }
}, { timestamps: true })

const PromoCode = mongoose.model("PromoCode", PromoCodeShcema)

module.exports = PromoCode;