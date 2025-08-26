import express from "express";
import multer from "multer";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Configuración multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // carpeta donde guardás imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // nombre único
  },
});
const upload = multer({ storage: storage });

// Asegurate que la carpeta 'uploads' exista en tu backend raíz

// Ruta POST que usa multer para recibir un solo archivo llamado "image"
router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
