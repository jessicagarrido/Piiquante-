const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Routes
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échoué : " + error));

//Cors
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images"))); // Gère la ressource image de manière statique

// Démarrage des routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
