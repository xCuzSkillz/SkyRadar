const express = require("express");
const router = express.Router();
const PlaneType = require("../models/PlaneType")

router.post("/add", async (req, res) => {
    try {
        await PlaneType.create({
            name: req.body.name,
            code: req.body.code,
            manufacturer: req.body.manufacturer,
            image: req.body.image,
        })
        res.redirect("/admin/plane-types-management")
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await PlaneType.findByIdAndUpdate(id, req.body)
        res.redirect("/admin/plane-types-management")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await PlaneType.findByIdAndDelete(id)
        res.redirect("/admin/plane-types-management")
    } catch (err) {
        console.log(err)
    }
})

router.post("/:id/layout/add", async (req, res) => {
    const { id } = req.params
    try {
        await PlaneType.findByIdAndUpdate(id, {
            $push: {
                layout: {
                    class: req.body.class,
                    rows: req.body.rows,
                    seatPattern: req.body.seatPattern,
                }
            }
        })
        res.redirect(`/admin/plane-types-management-configure/${id}`)
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id/layout/:sectionId", async (req, res) => {
    const { id, sectionId } = req.params
    try {
        await PlaneType.findByIdAndUpdate(id, {
            $pull: { layout: { _id: sectionId } }
        })
        res.redirect(`/admin/plane-types-management-configure/${id}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
