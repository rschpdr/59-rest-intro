// Importar o express
const express = require("express");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose").Schema.Types;

const SALT_ROUNDS = 10;

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const UserModel = require("../models/User.model");

// Importar função que gera o Token JWT
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

// REST => REpresentational State Transfer

// Cadastro

router.post("/signup", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    const { name, email, password } = req.body;

    // Verificar se a senha é forte

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "A senha deve conter pelo menos 8 caracteres, letras maiúscula e minúsculas, números e caracteres especiais",
      });
    }

    // Criptografar a senha

    // Gera o salt (string aleatória) com custo 10
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    // Criptografando a senha do usuário
    const passwordHash = bcrypt.hashSync(password, salt);

    // Inserir no banco de dados

    const result = await UserModel.create({ name, email, passwordHash });

    // Responder a requisição
    res.status(201).json(result);
  } catch (err) {
    console.log(err);

    // No mongoose, código de erro 11000 sempre se referem à erros de validação do modelo
    if (err.code === 11000) {
      return res.status(400).json(err.message ? err.message : err);
    }

    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    const { email, password } = req.body;

    // Procurar o usuário no banco de dados através do email

    const foundUser = await UserModel.findOne({ email });

    // Caso encontrado, verificar se a senha está correta

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    // Caso correta, criar uma sessão para esse usuário

    const token = generateToken(foundUser);

    res
      .status(200)
      .json({
        token,
        user: {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
        },
      });
  } catch (err) {
    console.log(err);
  }
});

// Perfil
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações do usuário no banco
    const user = await UserModel.findOne({ _id: req.user._id }).populate({
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
