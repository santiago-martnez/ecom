import express from "express";
import multer from "multer";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { obtenerCompras, crearCompra, obtenerCompraPorId } from "../controllers/compra.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = express.Router();


router.post("/", crearCompra);
router.get("/", authMiddleware,obtenerCompras);
router.get("/:id", authMiddleware, obtenerCompraPorId);


export default router;
