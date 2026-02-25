# 🚀 StockFlow API

A secure Inventory Management REST API built with **Spring Boot**, **Spring Security**, **JWT**, and **MySQL**.

This project implements stateless authentication, role-based authorization, pagination, and clean backend architecture.

---

## 📌 Features

- 🔐 JWT Authentication
- 👤 Role-based Authorization (ADMIN / USER)
- 📦 Product CRUD Operations
- 🧾 Order Management
- 📄 Pagination Support
- 🛡 Custom JWT Filter
- 🔑 BCrypt Password Encryption
- 🌐 RESTful API Design
- 🗃 MySQL Integration
- ⚙ Global Exception Handling

---

## 🛠 Tech Stack

- Java 22
- Spring Boot
- Spring Security
- Spring Data JPA (Hibernate)
- MySQL
- Maven
- JWT (io.jsonwebtoken)

---

## 🔐 Authentication Flow

1. Login via: POST /api/auth/login
2. Receive JWT token in response
3. Send token in header for secured endpoints: Authorization: Bearer <your_token>

---

## 📂 API Endpoints

### 🔑 Authentication
- `POST /api/auth/login`

### 📦 Products
- `GET /api/products`
- `GET /api/products?page=0&size=5`
- `POST /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`

### 🧾 Orders
- `POST /api/orders`
- `GET /api/orders`

---

## ⚙ Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/ankurjangra-1/stockflow-api.git

### 2️⃣ Configure Database

Update `src/main/resources/application.properties`:
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=your_username
spring.datasource.password=your_password

### 3️⃣ Run Application
mvn spring-boot:run

Application runs at:
http://localhost:8080

---

## 📈 Future Improvements

- Standardized API response wrapper
- Docker containerization
- Swagger documentation
- Unit & Integration tests
- CI/CD pipeline

---

## 👨‍💻 Author

Ankur  
Java Backend Developer  
Spring Boot | Security | REST APIs

---

⭐ If you found this useful, consider giving it a star.
