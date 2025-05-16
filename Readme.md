# 🌶️ Piiquante – Project 6 
![16275605596354_PiiquanteLogo](https://github.com/user-attachments/assets/923c7c1c-91c4-479e-8a47-6c84c258fe1e)

## 💻 OpenClassrooms Web Developer Path

> 🔐 Build a secure REST API for a spicy sauce rating app  
> 🛠️ Backend project using Node.js, Express & MongoDB

---

## 📖 Project Description

**Piiquante** is a company specializing in homemade spicy sauces with secret recipes.  
To grow its brand and community, the company wants to launch a web application where users can:

- Add their favorite sauces  
- Like or dislike sauces submitted by others

The goal of this project is to **build the backend API**, focusing on **security**, **data validation**, and **user authentication**.

---

## 🛠️ Technologies Used

- 🟢 **Node.js**  
- ⚙️ **Express**  
- 🍃 **MongoDB**  
- 🔐 **JWT & Bcrypt** for authentication

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/crlynh/piquante.git
cd piquante
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create folders & environment file
- Create an /images folder at the root of the project
- Create a .env file with the following variables:

```bash
PASSWORD_MONGOOSE=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm start
```
You should see this in the terminal:

```bash
> piquante@1.0.0 start
> node server.js

Listening on port 3000  
Connexion à MongoDB réussie !
```

## ✅ Features
- User authentication with secure password hashing

- CRUD operations for sauces

- Like/dislike logic with user tracking

- Secure HTTP headers with helmet

- Input validation and sanitization

---

## 📄 License
This project is part of the OpenClassrooms Web Developer Path and is intended for educational purposes only.

---
## 👨‍💻 Author

Made by **Jessica Garrido**  
🔗 [LinkedIn](https://www.linkedin.com/in/jessica-garrido/)  
🐙 [GitHub](https://github.com/jessicagarrido)
