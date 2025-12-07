# 🎓 TdA24-ABC123 - Lecturer Booking Platform

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version">
  <a href="https://github.com/Hraby/TdA24-ABC123/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-ISC-green?style=flat-square" alt="License"></a>
  <br>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <b>🚀 Tour de App 24 - Team ABC123</b><br>
  <b>A platform for booking lessons with lecturers</b>
</p>

Web application for booking lessons with lecturers. Students can browse lecturers, filter them by various criteria, and create reservations. Lecturers have access to a dashboard to manage their reservations.

---

## ✨ Key Features

*   **Browse Lecturers** - List of lecturers with filtering by tags, location, and price
*   **Book Lessons** - Reservation form with date and time selection
*   **Lecturer Dashboard** - Overview of reservations, statistics, and calendar export (.ics)
*   **Authentication** - JWT-based login for lecturers
*   **Filtering** - Filter lecturers by tags, location, and price per hour

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js 14, React, TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Radix UI
*   **Forms:** React Hook Form, Zod
*   **Database:** Prisma ORM, SQLite
*   **Authentication:** JWT
*   **Deployment:** Docker

---

## 🚀 Getting Started (For Developers)

<details>
<summary>Click to expand/collapse local development setup instructions</summary>

Follow these instructions to set up and run the TdA24-ABC123 project locally.

### Prerequisites

*   Node.js (LTS version, v18+ recommended)
*   npm (v8+ recommended)
*   Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Hraby/TdA24-ABC123.git
    cd TdA24-ABC123
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    ```bash
    # Generate Prisma Client
    npx prisma generate

    # Run database migrations
    npx prisma migrate dev

    # (Optional) Seed the database with sample data
    npm run seed
    ```

4.  **Environment Setup:**

    Create a `.env` file in the root directory (if needed). The project uses SQLite by default, so minimal configuration is required.

    ```env
    DATABASE_URL="file:./prisma/dev.db"
    JWT_SECRET="your-strong-jwt-secret-key"
    NODE_ENV="development"
    ```

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

3.  **Access Prisma Studio (Database GUI):**

    ```bash
    npx prisma studio
    ```

    This will open a web interface at [http://localhost:5555](http://localhost:5555) where you can view and edit your database.

### Available Scripts

*   `npm run dev` - Start development server
*   `npm run build` - Build for production
*   `npm run start` - Start production server
*   `npm run lint` - Run ESLint
*   `npm run seed` - Seed the database with sample data

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your-migration-name

# Reset database (development only - deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

</details>

---

## 🐳 Docker Deployment

<details>
<summary>Click to expand/collapse Docker setup instructions</summary>

### Build Docker Image

```bash
docker build -t tda24_abc123 .
```

### Run Docker Container

```bash
docker run -p 3000:3000 -d tda24_abc123
```

The application will be available at [http://localhost:3000](http://localhost:3000).

</details>

---

## 📋 API Endpoints

### Lecturers

*   `GET /api/lecturers` - Get all lecturers (supports query params: `tags`, `location`, `price_per_hour`)
*   `GET /api/lecturers/[uuid]` - Get specific lecturer by UUID
*   `POST /api/lecturers` - Create a new lecturer

### Reservations

*   `GET /api/reservations` - Get all reservations (supports query params: `uuid`, `date`)
*   `POST /api/reservations` - Create a new reservation

### Authentication

*   `POST /api/auth/login` - Lecturer login
*   `GET /api/session` - Get current session
---
## 🧑‍💻 The Team

This project was developed as part of **Tour de App 24** by Team ABC123:

*   **[hraby](https://github.com/Hraby)** (Michal Hrabal) - Fullstack Development & Project Lead
*   **[mirekondro](https://github.com/mirekondro)** (Mirek Ondroušek) - Frontend Development

---

<p align="center">
  <sub>Built with passion and ☕ by Team ABC123</sub>
</p>
