const express = require("express");
const router = express.Router();
const Airline = require("../models/Airline")

router.post("/airlines-management", async (req, res) => {
    try {
        await Airline.create({
            name: req.body.name,
            code: req.body.code,
            logo: req.body.logo,
        })

        res.redirect("/admin/airlines-management")
    } catch (err) {
        console.log(err)
    }
})

router.put("/airlines-management/:id", async (req, res) => {

    const { id } = req.params
    try {
        await Airline.findByIdAndUpdate(id, req.body)

        res.redirect("/admin/airlines-management")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/airlines-management/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Airline.findByIdAndDelete(id)
        res.redirect("/admin/airlines-management")
    } catch (err) {
        console.log(err)
    }
})






module.exports = router;