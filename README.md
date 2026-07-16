# Project Name
SkyRadar

## Overview
SkyRadar is a flight search and comparison platform, inspired by Skyscanner. Users search for flights by origin, destination, dates, and number of passengers, and get back a list of matching flights from different airlines — sortable by price, duration, or number of stops, with the cheapest and fastest options highlighted. Users can then book their chosen flight and track it from their personal dashboard, which shows upcoming and past bookings. Admins get a separate dashboard to manage the flights, airlines, and bookings behind the scenes.

## Screenshots
_Add screenshots of your search page, results/comparison page, and booking confirmation here once the UI is built._

Example:
```
![Search Page](./screenshots/search.png)
![Results Comparison](./screenshots/results.png)
![Booking Confirmation](./screenshots/confirmation.png)
```

## Technologies Used
1. EJS
2. Express
3. JavaScript
4. MongoDB & Mongoose
5. Node.js
6. CSS

## Getting Started
- [Planning Materials (Trello/Wireframes)](#) <!-- add your link here -->
- [Deployed App](#) <!-- add your deployed link here -->
- [GitHub Repo](#) <!-- add your repo link here -->

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/skybook.git
   ```
2. Navigate into the project folder:
   ```bash
   cd skybook
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
5. Seed the database with sample airlines and flights (recommended, since results need multiple flights per route to be worth comparing):
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
- As a user, I want to book a flight and enter passenger details so I can reserve my seat.
- As a user, I want to see a confirmation after booking so I know it was successful.
- As a user, I want to view my dashboard so I can see my upcoming and past bookings.
- As a user, I want to cancel a booking so my seat is released if my plans change.
- As an admin, I want to log in to an admin dashboard so I can manage the platform's flights.
- As an admin, I want to add, edit, and delete flights so the search results stay accurate.
- As an admin, I want to add and edit airlines so new carriers can be included in search results.
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

**Booking**
| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| flight | ObjectId (ref: Flight) |
| tripType | String (one-way / round-trip) |
| returnFlight | ObjectId (ref: Flight, optional) |
| passengerName | String |
| seatNumber | String |
| status | String (booked / cancelled) |
| bookedAt | Date |

**Relationships**
- One **Airline** has many **Flights** (one-to-many).
- One **User** can have many **Bookings** (one-to-many).
- One **Flight** can appear in many **Bookings** (one-to-many).
- A **Booking** links a **User** to one or two **Flights** (outbound, and optionally return).

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
| GET | /flights/:id/book | Booking form for a flight |
| POST | /bookings | Create a booking |
| GET | /bookings/:id | View booking confirmation |
| DELETE | /bookings/:id | Cancel a booking |
| GET | /dashboard | User dashboard — view own bookings |
| GET | /admin | Admin dashboard — overview stats |
| GET | /admin/flights | Admin — list all flights |
| GET | /admin/flights/new | Admin — new flight form |
| POST | /admin/flights | Admin — create flight |
| GET | /admin/flights/:id/edit | Admin — edit flight form |
| PUT | /admin/flights/:id | Admin — update flight |
| DELETE | /admin/flights/:id | Admin — delete flight |
| GET | /admin/airlines | Admin — list all airlines |
| POST | /admin/airlines | Admin — create airline |
| GET | /admin/bookings | Admin — view all bookings platform-wide |

## Features
- User authentication (signup, login, logout)
- Flight search by origin, destination, date(s), and passenger count
- One-way and round-trip search
- Multi-airline results for the same route, pulled from seeded/mock data
- Sort results by price, duration, or number of stops
- "Cheapest" and "Fastest" badges on results
- Seat availability tracking (prevents overbooking)
- Booking creation with passenger details
- Booking confirmation page
- **User dashboard**: view upcoming and past bookings, cancel a booking
- **Admin dashboard**: add/edit/delete flights, manage airlines, view all bookings platform-wide, quick stats overview
- Role-based access (`isAdmin` flag) restricting admin routes to admin accounts
- Booking cancellation (releases the seat back)

## Future Enhancements
- Filters for airline, number of stops, and price range as checkboxes/sliders
- Multi-city trip search
- Price alerts ("notify me if this route drops below $X")
- A price calendar view (cheapest day to fly, like Skyscanner's "whole month" search)
- Payment integration (mocked or real, e.g. Stripe)
- Email confirmation on booking
- Admin analytics (revenue over time, most booked routes)
- Real flight data via a public aviation API (e.g. Sky Scrapper on RapidAPI)

## Credits
- Built by [Your Name] as part of [Bootcamp Name] final/capstone project.
- Sample airline/flight data seeded manually / from [source, if any].