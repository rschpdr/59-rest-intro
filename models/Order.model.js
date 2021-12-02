// Importar o mongoose
const mongoose = require("mongoose");

// Definifir quais campos e quais regras desses campos os documentos no MongoDB terão (Schema)
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" }, // OBS.: o valor de 'ref' OBRIGATORIAMENTE precisa ser igual ao primeiro argumento do método 'model' do modelo referenciado
    products: [
      new mongoose.Schema(
        {
          productId: { type: mongoose.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, min: 1, required: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

// Exportar o modelo da coleção
module.exports = mongoose.model("Order", OrderSchema);
