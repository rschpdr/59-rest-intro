// Importar o express
const express = require("express");

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const OrderModel = require("../models/Order.model");
const UserModel = require("../models/User.model");

// REST => REpresentational State Transfer

// CRUD

// Crud Create (POST)

router.post("/order", async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição
    console.log(req.body);

    // Inserir no banco
    const result = await OrderModel.create(req.body);

    // Atualizar a lista de pedidos do usuário
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { orders: result._id } }, // Adicionar um novo elemento (id do pedido recém-criado) no campo 'orders' que é uma array
      { new: true, runValidators: true }
    );

    console.log(updatedUser);

    // Responder a requisição
    // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Lista)

router.get("/order", async (req, res) => {
  try {
    // Buscar as informações no banco
    const orders = await OrderModel.find()
      .populate("userId")
      .populate("products.productId");

    // Responder a requisição
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
