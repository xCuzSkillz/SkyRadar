const express = require("express") 
const app = express() 
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const dbc = require("./dbConnection")


dbc.dbConnection;

app.listen(process.env.PORT, async () => {
    try {
        console.log(`Listening to port ${process.env.PORT}`)
    } catch(err) {
        console.log(err)
    }
})