const router = require("express").Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const Flight = require("../models/Flight")
const Booking = require("../models/Booking")
const Passenger = require("../models/Passegner")
const crypto = require("crypto")

const CLASS_PRICE_FIELD = {
    economy: "economyPrice",
    business: "businessPrice",
    first: "firstPrice",
}

router.get('/', isLoggedIn, async (req,res)=>{
    const flights = await Flight.find().populate("airlineId").populate("planeTypeId").sort({ departureTime: 1 })
    res.render('homepage.ejs', { flights })
})

router.get('/booking/:type/:id', isLoggedIn, async (req,res)=>{

    const {id, type} = req.params

    const flights = await Flight.findById(id).populate("airlineId").populate("planeTypeId")
    const priceField = CLASS_PRICE_FIELD[type]
    if (!priceField || !flights || !flights[priceField]) {
        return res.redirect("/")
    }
    res.render('booking.ejs', { flights, type })
})

router.get('/booking/:type/:id/passengers', isLoggedIn, async (req,res)=>{

    const {id, type} = req.params

    const flights = await Flight.findById(id).populate("airlineId").populate("planeTypeId")
    const priceField = CLASS_PRICE_FIELD[type]
    if (!priceField || !flights || !flights[priceField]) {
        return res.redirect("/")
    }
    res.render('booking-passengers.ejs', { flights, type })
})

router.post('/booking/:type/:id/passengers', isLoggedIn, async (req,res)=>{
    try {
        const {id, type} = req.params
        const priceField = CLASS_PRICE_FIELD[type]

        const flight = await Flight.findById(id)
        if (!priceField || !flight || !flight[priceField]) {
            return res.redirect("/")
        }

        const booking = await Booking.create({
            userId: req.session.user._id,
            flightId: flight._id,
            tripId: crypto.randomUUID(),
            tripType: type,
            totalPrice: flight[priceField],
            status: "confirmed",
            bookedAt: new Date(),
        })

        await Passenger.create({
            bookingId: booking._id,
            fullName: req.body.fullName,
            age: req.body.age,
            passportNumber: req.body.passportNumber,
        })

        res.redirect("/bookings")
    } catch (err) {
        console.log(err)
        res.redirect("/")
    }
})

router.get('/bookings', isLoggedIn, async (req,res)=>{
    const bookings = await Booking.find({ userId: req.session.user._id })
        .populate({ path: "flightId", populate: [{ path: "airlineId" }, { path: "planeTypeId" }] })
        .sort({ bookedAt: -1 })

    const passengers = await Passenger.find({ bookingId: { $in: bookings.map((b) => b._id) } })
    const passengersByBooking = {}
    passengers.forEach((p) => {
        const key = p.bookingId.toString()
        if (!passengersByBooking[key]) passengersByBooking[key] = []
        passengersByBooking[key].push(p)
    })

    res.render('bookings.ejs', { bookings, passengersByBooking })
})


module.exports = router;