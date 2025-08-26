import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      cantidad: { type: Number, required: true },
      precioUnitario: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  cliente: {
    nombre: String,
    email: String
  },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

export const Compra = mongoose.model("Compra", compraSchema);
