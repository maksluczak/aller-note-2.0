# Aller Note

**Allergy Management & Tracking Application**  
_Full-stack project for portfolio purposes_

**Project demo:**  
➡️ https://aller-note-2-0.vercel.app/

---

## Project Overview

Aller Note 2.0 is a full-stack web application designed to support allergy management by combining two key functionalities:

1. Recording allergy symptoms in structured notes
2. Tracking pollen intensity levels

The application allows users to document allergy symptoms over time while simultaneously monitoring pollen exposure, enabling better understanding of symptom patterns.

---

## Technologies Used

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for building REST APIs
- **Database** – MongoDB
- **JWT (JSON Web Tokens)** – Authentication and authorization
- **REST API** – CRUD operations for notes and allergy-related data

### Frontend
- **Next.js** – User interface layer
- **Tailwind CSS** – Responsive layout
- **HTTP client** – API communication

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- Docker or MongoDB/Atlas instance

### Docker database (`database/`)
```bash
cd database
docker compose up -d
```
Starts a local MongoDB on `localhost:27018`, with the 16 Polish voivodeships pre-seeded as `Location` documents.
```bash
docker compose ps   # STATUS should say "healthy"
```

### Backend (`server/`)
```bash
cd server
npm install
cp .env.example .env
# edit .env: generate ACCESS_TOKEN_SECRET / REFRESH_TOKEN_SECRET / ADMIN_API_KEY
# the default DATABASE_URI matches the Docker setup
npm run dev
```
The API runs on `http://localhost:5050` by default.

### Frontend (`client/`)
```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```
The app runs on `http://localhost:3000`.

---

## Key Features

### Allergy Symptom Notes
- Create, edit, and delete notes describing allergy symptoms
- Notes scoped to authenticated users
- Historical symptom tracking over time

### Pollen Intensity Tracking
- Display pollen level data relevant to allergy management
- Ability to correlate symptom severity with pollen exposure
- Backend-ready structure for integration with external pollen data sources

### Authentication & Security
- User registration and login
- JWT-based authentication
- Secure access to user-specific data

### Backend Architecture
- RESTful API design
- Clear separation of concerns (controllers, routes, models)
- Scalable structure suitable for future expansion
