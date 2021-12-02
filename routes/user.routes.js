// Importar o express
const express = require("express");

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const UserModel = require("../models/User.model");

// REST => REpresentational State Transfer

// CRUD

// Crud Create (POST)

router.get("/profile/:id", async (req, res) => {
  try {
    // Buscar as informações do usuário no banco
    const user = await UserModel.findOne({ _id: req.params.id }).populate({
      path: "orders",
      model: "Order",
    });

    // Responder a requisição
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
