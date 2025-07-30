![GitHub stars](https://img.shields.io/github/stars/SamyakBorkar/EMS_FINAL?style=social)
# 🧑‍💼 Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** built using the **MERN stack** with user authentication, role-based access, and task management. EMS allows HR/Admin to efficiently manage employees, assign tasks, and track their progress — all from a clean and modern UI.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 👤 Role-based Access Control (Admin/Employee)
- 📋 Employee CRUD operations
- 📝 Task creation and assignment
- 📊 Employee dashboard to view assigned tasks
- 📦 Dockerized (frontend + backend + MongoDB)
- 🌐 RESTful APIs for seamless integration
- ⚙️ Environment variable support
- ☁️ Deployed with Docker or cloud hosting (Railway, Render, Vercel)

---

## 🛠️ Tech Stack

### 📌 Frontend
- React.js (Vite)
- Axios
- React Router DOM
- Tailwind CSS or Bootstrap *(your choice)*

### 📌 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- JSON Web Tokens (JWT)

### 📌 DevOps / Deployment
- Docker & Docker Compose
- MongoDB Atlas
- Railway / Vercel / Render *(optional)*

---


---

## 🐳 Docker Setup

Run the complete EMS application using Docker in just a few steps:

### 🔧 Step 1: Clone the Repository

```bash
git clone https://github.com/SamyakBorkar/EMS_FINAL.git
cd EMS_FINAL
```

### 🔧 Step 2: Build & Start Containers

```bash
docker compose up --build
```

This will:
- Spin up the **frontend** on port `3000`
- Spin up the **backend API** on port `5000`
- Start **MongoDB** inside a Docker container

### 🔧 Step 3: Access the Application

- 🔗 **Frontend**: [http://localhost:3000](http://localhost:3000)
- 🔗 **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- 🗄️ **MongoDB**: Running internally in the Docker network

### 🧹 Optional: Stop and Remove Containers

```bash
docker compose down
```
## 🌐 Live Access

You can access the live frontend here:  
🔗 [https://smarthr-zeta.vercel.app/](https://smarthr-zeta.vercel.app)

---

## 🙌 Made with ❤️ by **Samyak Borkar**


