// Importar o mongoose
const mongoose = require("mongoose");

// Definifir quais campos e quais regras desses campos os documentos no MongoDB terão (Schema)
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    trim: true,
  },
  manufacturer: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    trim: true,
  },
  price: { type: Number, required: true, min: 0 },
  inStock: { type: Number, required: true, min: 0, default: 0 },
  pictureUrl: {
    type: String,
    default: "http://www.plasson.com.br/livestock/images/image-not-found.jpg",
    trim: true,
  },
  category: {
    type: String,
    enum: ["Celular/Smartphone", "Computador/Notebook", "Acessórios", "Outros"],
    default: "Outros",
  },
  tags: {
    type: [String],
  },
});

// Exportar o modelo da coleção
module.exports = mongoose.model("Product", ProductSchema);
