const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("admin/index.ejs")
})

router.get("/airlines-management", async (req, res) => {
    res.render("admin/airlines-management.ejs")
})


module.exports = router;