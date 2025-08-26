import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import comprasRoutes from './routes/compra.routes.js';
import dotenv from "dotenv";

dotenv.config();
const app = express(); 

// const FRONTEND_URL = process.env.FRONTEND_URL;
// const allowedOrigins = [
//   FRONTEND_URL,
//   FRONTEND_URL + "/"
// ];
// Permitir solo tu frontend


app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

//app.use(cors());
app.use(express.json());



app.use("/api/products", productRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes); // login no requiere middleware
app.use("/api/dashboard", authMiddleware, productRoutes); // rutas protegidas
app.use("/api/payments", paymentsRoutes);
app.use("/api/compras", comprasRoutes);

export default app;
