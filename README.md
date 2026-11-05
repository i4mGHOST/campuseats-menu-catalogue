# TUTORIAL 8 - CampusEats Catalogue

**NAME - SUVOJIT NAG**
**ROLL NUMBER - 20251651094**

---

## Application Overview
The CampusEats Catalogue is a lightweight application designed to demonstrate core RESTful web service principles using Node.js and Express. It serves a dynamic food menu where client-side interactions seamlessly communicate with an in-memory REST API. One can view the current catalog, filter items based on dietary preferences, add new dishes via an interactive HTML form, and remove existing items in real-time.

---

## System Architecture

The application follows a standard decoupled 3-tier architecture:

```
+------------------------------------+
|           Browser (Client)         |
|   HTML5 + CSS3 + Vanilla Fetch API  |
+------------------------------------+
                  |
                  | HTTP (GET / POST / DELETE)
                  v
+------------------------------------+
|      REST API Server (Middleware)  |
|       Node.js + Express Framework  |
+------------------------------------+
                  |
                  | Read / Write
                  v
+------------------------------------+
|            Data Layer              |
|        In-Memory JavaScript        |
|          Array (`items`)           |
+------------------------------------+
```

1. **Client Tier (Frontend):** Plain HTML/CSS interface using native `fetch()` calls for asynchronous API communication.
2. **Server Tier (REST API):** Node.js runtime executing Express routes for data parsing, business logic, validation, and static asset delivery.
3. **Data Tier (Storage):** An in-memory JavaScript array storing item objects during the runtime lifecycle.

---

## Core Functionality

- **Read Operations (`GET`):** 
  - Retrieves the full menu of items (`GET /items`).
  - Supports query filtering (e.g., `GET /items?veg=true` or `GET /items?veg=false`).
  - Retrieves single dish details by identifier (`GET /items/:id`), returning a standard `404 Not Found` response if missing.
- **Write Operations (`POST`):**
  - Accepts JSON request bodies (`POST /items`) to append a dish to the catalogue.
  - Validates input fields and responds with status `201 Created` upon success or `422 Unprocessable Entity` for invalid submissions.
- **Delete Operations (`DELETE`):**
  - Removes a specific item by identifier (`DELETE /items/:id`).
  - Responds with `204 No Content` upon successful removal or `404 Not Found` if the item does not exist.

---

## File Contents & Structure

### Directory Layout
```text
catalogue/
├── package.json
├── server.js
└── public/
    ├── index.html
    └── style.css
```

---

## Key Components

1. **`express.json()` Middleware:** Automatically parses incoming request payloads with `Content-Type: application/json` and places the parsed JavaScript object into `req.body`.
2. **`express.static('public')` Middleware:** Directs Express to serve static assets from the `public/` directory (serving `index.html` by default on `GET /`).
3. **Route Handlers (`req.params` & `req.query`):**
   - **`req.params`:** Extract URL path variables such as `id` in `/items/:id`.
   - **`req.query`:** Extract URL search parameters such as `veg` in `/items?veg=true`.
4. **Standard HTTP Response Status Codes:**
   - **`200 OK`:** Successful GET request.
   - **`201 Created`:** Successful POST creation of a new item.
   - **`204 No Content`:** Successful DELETE operation returning no body.
   - **`404 Not Found`:** Resource identifier not present in data set.
   - **`422 Unprocessable Entity`:** Validation failure on input fields.

---