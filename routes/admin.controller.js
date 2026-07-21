const express = require("express");
const Airline = require("../models/Airline");
const Flight = require("../models/Flight");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("admin/index.ejs")
})

router.get("/airlines-management", async (req, res) => {
    const airlines = await Airline.find();
    res.render("admin/airlines-management.ejs", {airlines})
})

router.get("/airlines-management-edit/:id", async (req, res) => {

    const { id } = req.params

    const airlines = await Airline.findById(id);
    res.render("admin/airline-managment-edit.ejs", {airlines})
})

router.get("/flights-management", async (req, res) => {

    const Flights = await Flight.find()

    res.render("admin/flights-management.ejs", {f: Flights})
})



module.exports = router;