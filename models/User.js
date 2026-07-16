const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        maxLength: 45,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User;