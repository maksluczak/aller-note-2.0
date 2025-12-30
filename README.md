# Aller Note

**Allergy Management & Tracking Application**  
_Full-stack project for portfolio purposes_

**Project demo:**  
➡️ 

---

## Project Overview

Aller Note 2.0 is a **full-stack web application designed to support allergy management** by combining two key functionalities:

1. **Recording allergy symptoms in structured notes**
2. **Tracking pollen intensity levels**

The application allows users to document allergy symptoms over time while simultaneously monitoring pollen exposure, enabling better understanding of symptom patterns.
The current version represents a completed **MVP**, with additional features planned for further development.

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
