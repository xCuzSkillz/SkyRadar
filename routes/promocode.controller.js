const express = require("express");
const router = express.Router();
const PromoCode = require("../models/PromoCode")

router.post("/add", async (req, res) => {
    try {
        await PromoCode.create({
            code: req.body.code,
            discountPercent: req.body.discountPercent,
            expiryDate: req.body.expiryDate,
            usageLimit: req.body.usageLimit,
        })
        res.redirect("/admin/promocode-management")
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await PromoCode.findByIdAndUpdate(id, req.body)
        res.redirect("/admin/promocode-management")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await PromoCode.findByIdAndDelete(id)
        res.redirect("/admin/promocode-management")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
