# 🏟️ Simple Betting API

A minimal in-memory **NestJS** betting service demonstrating DTO validation, custom services, scheduled tasks, and event-driven architecture.


## 🧪 Setup and Run Instructions

1. Clone the repository:

```
https://github.com/dean998/simple-betting-api.git
```

2. Install dependancies:

```bash
npm install
```

3. Run tests

```
npm run test
```

4. Run the application

```
npm run start:dev
```

---


## 🧱 Architecture Overview

The app uses **NestJS** for a modular, testable structure. Here's a breakdown:

- `BettingService` holds in-memory data and handles core logic.
- `EventEmitter2` decouples domain logic from side effects (e.g. logging).
- DTOs enforce runtime validation using `class-validator`.
- A `CronJob` updates all market odds randomly every few minutes, mimicking live odds movement.
- Logging is handled via Nest's built-in `Logger` service.

---

## 📌 API Endpoints

### ✅ POST `/betting`

Create a new betting market.

**Request:**

```json
{
  "name": "Arsenal vs PSG",
  "sportType": "football",
  "eventStatus": "upcoming",
  "odds": 2.5
}
```

**Response:**

```json
{
  "id": "1",
  "name": "Arsenal vs PSG",
  "sportType": "football",
  "eventStatus": "upcoming",
  "odds": 2.5
}
```

### ✅ GET `/betting?sportType=football&eventStatus=upcoming`

Fetch all markets, optionally filtered by sport type and/or event status.

```json
{
  "id": "1",
  "name": "Arsenal vs PSG",
  "sportType": "football",
  "eventStatus": "upcoming",
  "odds": 2.5
}
```

### ✅ PATCH `/betting/:id/odds`

Update the odds of a specific market.

**Request:**

```json
{
  "odds": 3.1
}
```

**Response:**

```json
{
  "id": "1",
  "name": "Arsenal vs PSG",
  "sportType": "football",
  "eventStatus": "upcoming",
  "odds": 3.1
}
```

## 📈 Scaling Considerations

While this project uses an in-memory array for simplicity, a production-ready system should:

- ✅ Migrate to a persistent store like **PostgreSQL** or **Redis**.
  - Use **Prisma ORM** to manage schema, perform queries, and handle database migrations efficiently.
- ✅ Use horizontal scaling with **Docker**, **Kubernetes**, or **Cloud Run**.
- ✅ Use AWS SQS to decouple services, allowing background tasks (e.g., updating odds, sending notifications) to be processed asynchronously by separate workers. This will prevent delays in user-facing operations and improve overall system scalability.
- ✅ Implement **WebSockets** for pushing live odds updates to clients.
- ✅ Add **Redis caching** for high-traffic endpoints to reduce DB load during peak usage.

---

## ✅ Tech Stack

- **NestJS**
- **TypeScript**
- **EventEmitter2**
- **class-validator**
- **@nestjs/schedule** for cron jobs

---

## 🤖 AI Usage Documentation
- **GitHub Copilot** was used for autocompletion and code generation suggestions during development.
- **ChatGPT** was used to assist with spelling, grammar, and clarity when writing the documentation.

## 🧠 Main Assumptions

- The goal of this API is to **create and manage betting markets**, not to facilitate user betting.
- Users are not able to place bets — the system only supports:
  - Creating a betting market (e.g., `"England wins against France"`).
  - Updating market odds (e.g., `1.1` meaning £1 returns £1.10).
  - Fetching markets based on filters like `sportType` or `eventStatus`.
- Odds are in **decimal format** (common in Europe): a value of `1.1` means a £1 stake returns £1.10.
- This is a simplified, in-memory implementation meant to demonstrate architecture and functionality, not production readiness.
- Filtering supports query parameters to fetch relevant markets without loading all data.
- The implementation uses enums (`SportType`, `EventStatus`) to constrain and validate input.
- No persistent database or user management is included to keep the scope tight.
- Events are emitted when odds are updated, simulating a real-time system integration.
