const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const dbConnection =  async () => {
    try {
      await  mongoose.connect(process.env.CONNECTION_STRING)
      console.log("Connected to the database")
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConnection()