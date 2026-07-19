const express = require("express") 
const app = express() 
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const dbc = require("./dbConnection")
const indexController = require("./routes/index.controller")
const authController = require("./routes/auth.controller")
const session = require('express-session');
const {MongoStore} = require("connect-mongo");

app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING,
    collectionName: "sessions"
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use("/", indexController)
app.use("/auth", authController)

app.listen(process.env.PORT, async () => {
    try {
        console.log(`Listening to port ${process.env.PORT}`)
    } catch(err) {
        console.log(err)
    }
})