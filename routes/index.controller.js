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

const PAYMENT_BASE_URL = "https://pocketpay-ercr.onrender.com/pay"

router.get('/', isLoggedIn, async (req,res)=>{
    const { origin, destination, departDate } = req.query

    const filter = {}
    if (origin) filter.origin = { $regex: origin, $options: "i" }
    if (destination) filter.destination = { $regex: destination, $options: "i" }
    if (departDate) {
        const start = new Date(departDate + "T00:00:00")
        const end = new Date(departDate + "T23:59:59")
        filter.departureTime = { $gte: start, $lte: end }
    }

    const flights = await Flight.find(filter).populate("airlineId").populate("planeTypeId").sort({ departureTime: 1 })
    res.render('homepage.ejs', { flights, query: { origin, destination, departDate } })
})

router.get('/booking/payment/:bookingId', isLoggedIn, async (req,res)=>{
    const { bookingId } = req.params

    const booking = await Booking.findOne({ _id: bookingId, userId: req.session.user._id })
        .populate({ path: "flightId", populate: [{ path: "airlineId" }, { path: "planeTypeId" }] })
    if (!booking) {
        return res.redirect("/")
    }

    const paymentUrl = `${PAYMENT_BASE_URL}/${booking.totalPrice}/skyrada/${booking.userId}/${booking.flightId._id}`

    res.render('booking-payment.ejs', { booking, paymentUrl })
})

router.get('/booking/success/:userId/:bookingId', isLoggedIn, async (req,res)=>{
    const { userId, bookingId } = req.params

    if (userId !== req.session.user._id.toString()) {
        return res.redirect("/")
    }

    const booking = await Booking.findOneAndUpdate(
        { _id: bookingId, userId },
        { status: "confirmed" },
        { new: true }
    ).populate({ path: "flightId", populate: [{ path: "airlineId" }, { path: "planeTypeId" }] })

    if (!booking) {
        return res.redirect("/")
    }

    res.render('booking-success.ejs', { booking })
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
            status: "pending",
            bookedAt: new Date(),
        })

        await Passenger.create({
            bookingId: booking._id,
            fullName: req.body.fullName,
            age: req.body.age,
            passportNumber: req.body.passportNumber,
        })

        res.redirect(`/booking/payment/${booking._id}`)
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