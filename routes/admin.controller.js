const express = require("express");
const Airline = require("../models/Airline");
const Flight = require("../models/Flight");
const PromoCode = require("../models/PromoCode");
const PlaneType = require("../models/PlaneType");
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

    const flights = await Flight.find().populate("airlineId").populate("planeTypeId")

    const newList = flights.forEach(element => {
        element
    });

    console.log(newList)
    const airlines = await Airline.find();
    const planeTypes = await PlaneType.find();
    res.render("admin/flights-management.ejs", {flights, airlines: airlines, planeTypes})
})

router.get("/flights-management-edit/:id", async (req, res) => {

    const { id } = req.params

    const flight = await Flight.findById(id).populate("airlineId").populate("planeTypeId")
    const airlines = await Airline.find();
    const planeTypes = await PlaneType.find();
    res.render("admin/flight-management-edit.ejs", { flight, airlines, planeTypes })
})

router.get("/promocode-management", async (req, res) => {
    const promocodes = await PromoCode.find();
    res.render("admin/promocode-management.ejs", { promocodes })
})

router.get("/promocode-management-edit/:id", async (req, res) => {

    const { id } = req.params

    const promocode = await PromoCode.findById(id)
    res.render("admin/promocode-management-edit.ejs", { promocode })
})

router.get("/plane-types-management", async (req, res) => {
    const planeTypes = await PlaneType.find();
    res.render("admin/plane-types-management.ejs", { planeTypes })
})

router.get("/plane-types-management-edit/:id", async (req, res) => {

    const { id } = req.params

    const planeType = await PlaneType.findById(id)
    res.render("admin/plane-type-management-edit.ejs", { planeType })
})

router.get("/plane-types-management-configure/:id", async (req, res) => {

    const { id } = req.params

    const planeType = await PlaneType.findById(id)
    res.render("admin/plane-type-configuration.ejs", { planeType })
})



module.exports = router;