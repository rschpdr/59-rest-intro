const mongoose = require("mongoose");

const MONGODB_URI = `mongodb://localhost:27017/super-loja`;

const connPromise = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connObj) =>
    console.log(`Conectado com sucesso ao banco ${connObj.connections[0].name}`)
  )
  .catch((err) => console.log("Erro de conexão com o MongoDB", err));

module.exports = connPromise;
