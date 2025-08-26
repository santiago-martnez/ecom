import { Product } from "../models/product.model.js";

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    console.log(req.body);

    // Si subiste imagen con multer, está en req.file
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // URL relativa para servir con express.static
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
