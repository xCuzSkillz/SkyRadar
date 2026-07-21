const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight")

const STATIC_PROMOCODE_ID = "0".repeat(20) + "cafe"

router.post("/add", async (req, res) => {
    try {
        await Flight.create({
            airlineId: req.body.airlineId,
            planeTypeId: req.body.planeTypeId,
            promoCodeId: STATIC_PROMOCODE_ID,
            flightNumber: req.body.flightNumber,
            origin: req.body.origin,
            destination: req.body.destination,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            duration: req.body.duration,
            stops: req.body.stops,
            price: req.body.price,
        })
        res.redirect("/admin/flights-management")
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Flight.findByIdAndUpdate(id, req.body)
        res.redirect("/admin/flights-management")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Flight.findByIdAndDelete(id)
        res.redirect("/admin/flights-management")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;