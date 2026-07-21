const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight")

router.post("/airlines-management", async (req, res) => {
    try {
        
        await Flight.create({
            airlineId: "FA",
            promoCodeId: "CODE",
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