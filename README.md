# Project Name
SkyRadar

## Overview
SkyRadar is a flight search and comparison platform, inspired by Skyscanner. Users search for flights by origin, destination, dates, and number of passengers, and get back a list of matching flights from different airlines — sortable by price, duration, or number of stops, with the cheapest and fastest options highlighted. Users pick a flight, select their seats, fill in passenger details, apply a promo code if they have one, and book. Users can also save flights to a wishlist, leave reviews on airlines, and track everything from their personal dashboard. Admins get a separate dashboard to manage flights, airlines, bookings, and promo codes behind the scenes.

## Screenshots
_Add screenshots of your search page, results/comparison page, seat selection, and booking confirmation here once the UI is built._

Example:
```
![Home Page](https://i.imgur.com/XnNecjf.png)
![Booking Page](https://i.imgur.com/PZolDQv.png)
![Seats Configuration](https://i.imgur.com/dZSRef6.png)
![Booking Confirmation](./screenshots/confirmation.png)
```

## Technologies Used
1. EJS
2. Express
3. JavaScript
4. MongoDB & Mongoose
5. Node.js
6. Tailwind CSS
7. CSS

## Getting Started
- [Deployed App](https://skyradar-2oyj.onrender.com/) <!-- add your deployed link here -->
- [GitHub Repo](https://github.com/xCuzSkillz/SkyRadar) <!-- add your repo link here -->

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/skyradar.git
   ```
2. Navigate into the project folder:
   ```bash
   cd skyradar
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_here
   PORT=3000
   ```
5. Seed the database with sample airlines, flights, and promo codes (recommended, since results need multiple flights per route to be worth comparing):
   ```bash
   node seed.js
   ```
6. Start the server:
   ```bash
   npm run dev
   ```
7. Visit `http://localhost:3000` in your browser.

## User Stories
- As a user, I want to sign up and log in so I can book flights under my account.
- As a user, I want to search for flights by origin, destination, dates, and passenger count so I can find trips that fit my plans.
- As a user, I want to choose one-way or round-trip so I can search for either type of journey.
- As a user, I want to see a list of matching flights from different airlines so I can compare my options.
- As a user, I want to sort results by price, duration, or number of stops so I can find what matters most to me.
- As a user, I want the cheapest and fastest flights highlighted so I can spot good deals quickly.
- As a user, I want to view a flight's full details (airline, times, layovers, price) before booking.
- As a user, I want to select my seat from a seat map so I can pick where I sit.
- As a user, I want to enter passenger details for everyone on the booking so all travelers are properly registered.
- As a user, I want to apply a promo code so I can get a discount on my booking.
- As a user, I want to see a confirmation after booking so I know it was successful.
- As a user, I want to view my dashboard so I can see my upcoming and past bookings.
- As a user, I want to cancel a booking so my seat is released if my plans change.
- As a user, I want to save flights to a wishlist so I can come back to them later.
- As a user, I want to leave a rating and review for an airline so I can share my experience.
- As a user, I want to read other users' reviews of an airline before booking with them.
- As an admin, I want to log in to an admin dashboard so I can manage the platform's flights.
- As an admin, I want to add, edit, and delete flights so the search results stay accurate.
- As an admin, I want to add and edit airlines so new carriers can be included in search results.
- As an admin, I want to create and manage promo codes so I can run discount campaigns.
- As an admin, I want to see a list of all bookings across the platform so I can keep track of activity.
- As an admin, I want to view basic stats (total flights, total bookings, revenue) so I can get a quick overview of the platform.

## Database Design

**User**
| Field | Type |
|-------|------|
| username | String |
| email | String |
| password | String (hashed) |
| isAdmin | Boolean (default: false) |

**Airline**
| Field | Type |
|-------|------|
| name | String |
| code | String (e.g. "BA", "EK") |
| logo | String (URL) |

**Flight**
| Field | Type |
|-------|------|
| airline | ObjectId (ref: Airline) |
| flightNumber | String |
| origin | String |
| destination | String |
| departureTime | Date |
| arrivalTime | Date |
| duration | Number (minutes) |
| stops | Number |
| price | Number |
| totalSeats | Number |
| seatsAvailable | Number |

**Seat**
| Field | Type |
|-------|------|
| flight | ObjectId (ref: Flight) |
| seatNumber | String (e.g. "14A") |
| class | String (economy / premium / business) |
| price | Number (extra cost on top of base flight price, 0 for standard economy) |
| isBooked | Boolean |

**Passenger**
| Field | Type |
|-------|------|
| booking | ObjectId (ref: Booking) |
| fullName | String |
| age | Number |
| passportNumber | String |
| seat | ObjectId (ref: Seat) |

**Booking**
| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| flight | ObjectId (ref: Flight) |
| tripId | String (shared by both legs of a round trip; same value on the outbound and return Booking) |
| tripType | String (one-way / round-trip) |
| passengers | [ObjectId] (ref: Passenger) |
| promoCode | ObjectId (ref: PromoCode, optional) |
| totalPrice | Number |
| status | String (booked / cancelled) |
| bookedAt | Date |

**Review**
| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| airline | ObjectId (ref: Airline) |
| rating | Number (1–5) |
| comment | String |
| createdAt | Date |

**PromoCode**
| Field | Type |
|-------|------|
| code | String |
| discountPercent | Number |
| expiryDate | Date |
| usageLimit | Number |
| timesUsed | Number |

**SavedFlight**
| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| flight | ObjectId (ref: Flight) |
| savedAt | Date |

**Relationships**
- One **Airline** has many **Flights** (one-to-many).
- One **Airline** has many **Reviews** (one-to-many).
- One **User** has many **Bookings** (one-to-many).
- One **User** has many **Reviews** (one-to-many).
- One **User** has many **SavedFlights** (one-to-many).
- One **Flight** can appear in many **Bookings** and many **SavedFlights** (one-to-many, both).
- One **Flight** has many **Seats** (one-to-many).
- A round trip is two separate **Booking** documents (outbound + return) sharing the same `tripId` — not a database relationship, just a shared value used to group them when displaying/cancelling a trip together.
- One **Booking** has many **Passengers** (one-to-many).
- One **Seat** is assigned to at most one **Passenger** (one-to-one, once booked).
- One **PromoCode** can be applied to many **Bookings** (one-to-many).

## Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | / | Home page with search form |
| GET | /auth/signup | Signup form |
| POST | /auth/signup | Create new user |
| GET | /auth/login | Login form |
| POST | /auth/login | Log user in |
| GET | /auth/logout | Log user out |
| GET | /flights/search | Search results (query params: origin, destination, date, passengers, tripType, sortBy) |
| GET | /flights/:id | View single flight details |
| GET | /flights/:id/seats | View seat map for a flight (available/booked, by class) |
| GET | /flights/:id/book | Booking form (passenger details, seat selection, promo code) |
| POST | /flights/:id/save | Save a flight to wishlist |
| DELETE | /saved/:id | Remove a flight from wishlist |
| GET | /saved | View saved/wishlist flights |
| POST | /bookings | Create a booking (with passengers, seats, promo code) |
| GET | /bookings/:id | View booking confirmation |
| DELETE | /bookings/:id | Cancel a booking |
| GET | /airlines/:id | View airline profile with reviews |
| POST | /airlines/:id/reviews | Submit a review for an airline |
| GET | /dashboard | User dashboard — view own bookings and saved flights |
| GET | /admin | Admin dashboard — overview stats |
| GET | /admin/flights | Admin — list all flights |
| GET | /admin/flights/new | Admin — new flight form |
| POST | /admin/flights | Admin — create flight |
| GET | /admin/flights/:id/edit | Admin — edit flight form |
| PUT | /admin/flights/:id | Admin — update flight |
| DELETE | /admin/flights/:id | Admin — delete flight |
| POST | /admin/flights/:id/seats | Admin — generate/reset the seat layout for a flight |
| GET | /admin/airlines | Admin — list all airlines |
| POST | /admin/airlines | Admin — create airline |
| GET | /admin/bookings | Admin — view all bookings platform-wide |
| GET | /admin/promocodes | Admin — list all promo codes |
| POST | /admin/promocodes | Admin — create a promo code |
| PUT | /admin/promocodes/:id | Admin — update a promo code |
| DELETE | /admin/promocodes/:id | Admin — delete a promo code |

## Features
- User authentication (signup, login, logout)
- Flight search by origin, destination, date(s), and passenger count
- One-way and round-trip search
- Multi-airline results for the same route, pulled from seeded/mock data
- Sort results by price, duration, or number of stops
- "Cheapest" and "Fastest" badges on results
- Interactive seat map with seat selection, by class (economy / premium / business), with per-seat pricing
- Passenger detail form supporting multiple travelers per booking, each assigned to their own seat
- Promo code redemption at checkout
- Seat availability tracking (prevents overbooking)
- Booking confirmation page
- Wishlist: save flights to revisit later
- Airline reviews and star ratings, visible on the airline's profile
- **User dashboard**: view upcoming/past bookings, saved flights, cancel a booking
- **Admin dashboard**: add/edit/delete flights, manage airlines, manage promo codes, view all bookings platform-wide, quick stats overview
- Role-based access (`isAdmin` flag) restricting admin routes to admin accounts
- Booking cancellation (releases the seat back)

## Future Enhancements
- Filters for airline, number of stops, and price range as checkboxes/sliders
- Multi-city trip search
- Price alerts ("notify me if this route drops below $X")
- A price calendar view (cheapest day to fly, like Skyscanner's "whole month" search)
- Payment integration (mocked or real, e.g. Stripe)
- Email confirmation on booking
- Loyalty points program
- Admin analytics (revenue over time, most booked routes)
- Real flight data via a public aviation API (e.g. Sky Scrapper on RapidAPI)

## Credits
- Built by [Your Name] as part of [Bootcamp Name] final/capstone project.
- Sample airline/flight data seeded manually / from [source, if any].