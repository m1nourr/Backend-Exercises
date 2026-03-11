# Backend Labs Project

This project contains three labs built on top of each other in the same Express application.

---

## What the Labs Do

### Lab 1 — MVC + Database + Tasks REST API
Lab 1 builds a JSON REST API for a collection of tasks.

It includes:
- Express server
- MVC-like structure with routes, controllers, models, and service
- MySQL/MariaDB database connection
- CRUD for tasks
- JSON responses
- task data stored in the database

### Lab 2 — Security + API Keys + JWT
Lab 2 continues from Lab 1 and secures the server.

It includes:
- Helmet
- disabled `x-powered-by`
- API key middleware
- protected API key route
- JWT login
- JWT-protected route
- hard-coded user `doe` with password `doe`
- password hashing with `bcrypt`

### Lab 3 — EJS + Sessions + Flash Messages + Rendered Views
Lab 3 continues from Lab 1 and Lab 2 and adds rendered web pages.

It includes:
- EJS template engine
- sessions
- flash messages
- landing page for `/`
- Friday page with query string testing
- task CRUD through web pages and forms
- flash messages for task create, update, and delete

---

## Tech Stack

- Node.js
- Express
- MySQL / MariaDB
- EJS
- express-session
- Helmet
- bcrypt
- jsonwebtoken
- Morgan

---

## Setup

### 1. Start MySQL

``
brew services start mysql
``
``
brew services list
``

### 2. End MySQL
``
brew services stop mysql
``
