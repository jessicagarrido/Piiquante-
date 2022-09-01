const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://Projet6:${password}@piiquante.vbp384w.mongodb.net/?retryWrites=true&w=majority`;

//Routes
// const sauceRoutes = require('./routes/sauce');
const userRoutes = require("./routes/user");

mongoose
  .connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // Gère la ressource image de manière statique 

//Middleware
app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

// Démarrage des routes
// app.use('/api/sauces', sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
