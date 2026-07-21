const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight")

const STATIC_AIRLINE_ID = "0".repeat(22) + "fa"
const STATIC_PROMOCODE_ID = "0".repeat(20) + "cafe"

router.post("/add", async (req, res) => {
    try {

        await Flight.create({
            airlineId: STATIC_AIRLINE_ID,
            promoCodeId: STATIC_PROMOCODE_ID,
            flightNumber: req.body.flightNumber,
            origin: req.body.origin,
            destination: req.body.destination,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            duration: req.body.duration,
            stops: req.body.stops,
            price: req.body.price,
            totalSeats: req.body.totalSeats,
            seatsAvailable: req.body.seatsAvailable
        })
        res.redirect("/admin/flights-management")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;