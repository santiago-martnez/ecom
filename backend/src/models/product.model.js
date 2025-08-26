import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // URL de imagen
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
