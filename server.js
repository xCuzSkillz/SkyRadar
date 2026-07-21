const express = require("express") 
const app = express() 
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const dbc = require("./dbConnection")
const indexController = require("./routes/index.controller")
const authController = require("./routes/auth.controller")
const adminController = require("./routes/admin.controller")
const airlineManagment = require("./routes/airline.controller")
const flightsController = require("./routes/flight.controller")
const promocodeController = require("./routes/promocode.controller")
const planeTypesController = require("./routes/planetype.controller")
const isAdmin = require("./middlewares/isAdmin")
const setLocals = require("./middlewares/setLocals")
const session = require('express-session');
const {MongoStore} = require("connect-mongo");

app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

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

app.use(setLocals)

app.use("/", indexController)
app.use("/auth", authController)
app.use("/admin", isAdmin, adminController)
app.use("/airline", isAdmin, airlineManagment)
app.use("/flights", isAdmin, flightsController)
app.use("/promocode", isAdmin, promocodeController)
app.use("/planetypes", isAdmin, planeTypesController)

app.listen(process.env.PORT, async () => {
    try {
        console.log(`Listening to port ${process.env.PORT}`)
    } catch(err) {
        console.log(err)
    }
})