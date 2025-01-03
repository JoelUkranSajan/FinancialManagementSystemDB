# Frontend - Financial Management System

This is the frontend application for the Banking System. It is built using **Next.js** and serves as the user interface for interacting with the backend services.

---

## Features
- User account registration and login.
- View and manage cards and loans.
- Responsive design for desktop and mobile platforms.

---

## Prerequisites
To set up and run the application, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**

---

## File Structure
The project follows a modular structure. Key directories include:

- **api**: Contains API route handlers.
  - **accounts**: Handles account-related operations.
    - `create.js`, `delete.js`, `fetch.js`, `update.js`
  - **cards**: Handles card-related operations.
    - `create.js`, `delete.js`, `get.js`, `update.js`
  - **loans**: Handles loan-related operations.
    - `create.js`, `delete.js`, `get.js`, `update.js`

---

## Local Development Setup

Follow these steps to set up the application for local development:

### 1. Clone the Repository
```bash
git clone <https://gitlab.com/philip29cyriac/financial-management-system-db.git>
cd frontend
```

### 2. Create the Network
Before running the application, create the required Docker network:

```bash
docker network create eazybank
```
### 3. Build and Start the Application
To build the application and start the container, run the following command:
```bash
docker-compose up --build
```

## Endpoint
Open http://localhost:3000 in your browser.