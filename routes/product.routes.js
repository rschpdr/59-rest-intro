// Importar o express
const express = require("express");

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const ProductModel = require("../models/Product.model");

// REST => REpresentational State Transfer

// Seguir as regras do REST: usar os métodos HTTP corretos pra cada ação (GET pra buscar, POST pra inserir, etc) e responder com o status HTTP correto (200 pra sucesso, 201 pra criação, 404 pra não encontrado, etc)

// CRUD

// Crud Create (POST)

router.post("/product", async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição
    console.log(req.body);

    // Inserir no banco
    const result = await ProductModel.create(req.body);

    // Responder a requisição
    // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Lista)

router.get("/product", async (req, res) => {
  try {
    // Buscar as informações no banco
    const products = await ProductModel.find();

    // Responder a requisição
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)

router.get("/product/:id", async (req, res) => {
  try {
    // Buscar as informações no banco
    const product = await ProductModel.findOne({ _id: req.params.id });

    // Verificar se o banco encontrou o produto
    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    // Responder a requisição
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// crUd Update (PATCH)
router.patch("/product/:id", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    // Atualizar o registro
    const result = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/product/:id", async (req, res) => {
  try {
    const result = await ProductModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    // Pela regra do REST, deleções devem retornar um objeto vazio
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
