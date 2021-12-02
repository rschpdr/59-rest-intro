// Importar o mongoose
const mongoose = require("mongoose");

// Definifir quais campos e quais regras desses campos os documentos no MongoDB terão (Schema)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 250, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
});

// Exportar o modelo da coleção
module.exports = mongoose.model("User", UserSchema);
