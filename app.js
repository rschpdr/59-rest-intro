// Importar o Express
const express = require("express");
// Biblioteca de logs
const morgan = require("morgan");

const API_VERSION = 1;

const connectToDb = require("./config/db.config");

// Instanciar o Express
const app = express();

// Configurar o Express para aceitar corpos de requisição no formato JSON
app.use(express.json());

// Ligando a biblioteca de logs no Express
app.use(morgan("dev"));

// Ligar os roteadores na instância do Express
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");
const userRouter = require("./routes/user.routes");

// Estamos prefixando todos os endpoints da nossa API com a palavra "api" e uma versão. Isso nos ajuda a identificar futuramente quando houverem vários clientes diferentes qual versão da API cada um deles usa
app.use(`/api/v${API_VERSION}`, productRouter);
app.use(`/api/v${API_VERSION}`, orderRouter);
app.use(`/api/v${API_VERSION}`, userRouter);

// Abaixo estamos esperando a conexão com o banco de dados antes de subir o servidor Express. Isso impede que tenhamos um servidor quebrado funcionando.
connectToDb
  .then(() => {
    // Escutar requisições em uma porta específica
    app.listen(4000, () => {
      console.log("Servidor subiu com sucesso!");
    });
  })
  .catch((err) => {
    console.log(err);
    // O código mata o processo do Node.js
    process.exit(5); // 5 significa Erro Fatal, ou seja, um erro sem solução nessa execução do script
  });
