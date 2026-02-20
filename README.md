# Loyalty OS – Customer Loyalty Backend Platform

Loyalty OS is a backend system designed to manage customers, rewards, and transactions for restaurant loyalty programs.  
The project focuses on **secure APIs**, **clean architecture**, and **enterprise-ready backend practices**.

---

## Tech Stack

- Java 21  
- Spring Boot  
- Spring Security (JWT)  
- Spring Data JPA / Hibernate  
- MySQL  
- Swagger / OpenAPI  
- JUnit & Mockito  
- Docker & Docker Compose  

---

## Architecture

The application follows a **layered architecture** to ensure maintainability and scalability:

- **Controller** – HTTP request handling  
- **Service** – Business logic and rules  
- **Repository** – Data access layer (JPA)  
- **DTOs** – Clean input/output models  

This separation allows the system to scale and evolve without tightly coupling components.

---

## Features

- Secure authentication and authorization using JWT  
- Role-based access control  
- Customer and reward management  
- Transactional business logic  
- RESTful API design  
- API documentation with Swagger  

---

## Running the Project

### Prerequisites

Make sure you have the following installed:

- Java 21  
- Docker & Docker Compose  
- Git  

---

### Environment Variables

Create a `.env` file (or configure environment variables) with the following values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=loyalty_os
DB_USER=root
DB_PASSWORD=password

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000
```

---

### Run with Docker (Recommended)

The easiest way to run the project is using Docker, which ensures a consistent environment.
docker-compose up --build

This will:
	•	Start a MySQL database container
	•	Start the Spring Boot backend container
	•	Expose the API on http://localhost:8080

### Run Locally (Without Docker)

If you prefer to run the application locally:
./mvnw spring-boot:run

Make sure MySQL is running and the database configuration matches your environment variables.

⸻

### API Documentation

Once the application is running, Swagger UI is available at:
http://localhost:8080/swagger-ui.html

This allows real-time exploration and testing of the API endpoints.

⸻

### Testing

Unit and service-level tests are implemented using:
	•	JUnit
	•	Mockito

Tests are designed to validate business logic and prevent regressions.

⸻

### Project Goal

This project was built to practice and demonstrate:
	•	Enterprise-style backend architecture
	•	Secure API development
	•	Clean code principles
	•	Containerized development with Docker

⸻

### Author

Johnny Telles
Java Backend Developer
	•	GitHub: https://github.com/johnnytelles77
	•	Portfolio: https://johnnytelles77.github.io
