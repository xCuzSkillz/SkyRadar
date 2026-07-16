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
    }
})