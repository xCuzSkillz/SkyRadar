require("dotenv").config()
const mongoose = require("mongoose")
const Flight = require("./models/Flight")

// static placeholders, same idea as the "FA" / "CODE" values in routes/flight.controller.js
const STATIC_AIRLINE_ID = "0".repeat(22) + "fa"
const STATIC_PROMOCODE_ID = "0".repeat(20) + "cafe"

const mockFlights = [
    { flightNumber: "SR101", origin: "JFK", destination: "LAX", departureTime: new Date("2026-08-02T08:30:00"), arrivalTime: new Date("2026-08-02T11:45:00"), duration: 375, stops: 0, price: 320, totalSeats: 180, seatsAvailable: 42 },
    { flightNumber: "SR204", origin: "ORD", destination: "MIA", departureTime: new Date("2026-08-03T14:15:00"), arrivalTime: new Date("2026-08-03T18:05:00"), duration: 230, stops: 1, price: 210, totalSeats: 150, seatsAvailable: 12 },
    { flightNumber: "SR330", origin: "SFO", destination: "SEA", departureTime: new Date("2026-08-04T06:00:00"), arrivalTime: new Date("2026-08-04T08:10:00"), duration: 130, stops: 0, price: 145, totalSeats: 120, seatsAvailable: 0 },
    { flightNumber: "SR458", origin: "DFW", destination: "ATL", departureTime: new Date("2026-08-05T19:20:00"), arrivalTime: new Date("2026-08-05T21:50:00"), duration: 150, stops: 0, price: 260, totalSeats: 160, seatsAvailable: 87 },
].map((flight) => ({ ...flight, airlineId: STATIC_AIRLINE_ID, promoCodeId: STATIC_PROMOCODE_ID }))

async function seed() {
    await mongoose.connect(process.env.CONNECTION_STRING)

    await Flight.deleteMany({ flightNumber: { $in: mockFlights.map((f) => f.flightNumber) } })
    await Flight.insertMany(mockFlights)

    console.log(`Seeded ${mockFlights.length} flights`)
    await mongoose.disconnect()
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
