import { Compra } from "../models/compra.model.js";
import { Product } from "../models/product.model.js";

// Crear una nueva compra
export const crearCompra = async (req, res) => {
  try {
    const { productos, cliente } = req.body; 
    // productos: [{ productoId, cantidad }]
    // cliente: { nombre, email, ... } (opcional)

    let total = 0;
    let productosProcesados = [];

    for (let item of productos) {
      const productoDB = await Product.findById(item.productoId);

      if (!productoDB) {
        return res.status(404).json({ error: `Producto ${item.productoId} no encontrado` });
      }

      if (productoDB.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${productoDB.name}` });
      }

      // Calcular subtotal
      const subtotal = productoDB.price * item.cantidad;
      total += subtotal;

      // Guardar lo procesado
      productosProcesados.push({
        producto: productoDB._id,
        cantidad: item.cantidad,
        precioUnitario: productoDB.price,
        subtotal
      });

      // Descontar stock
      productoDB.stock -= item.cantidad;
      await productoDB.save();
    }

    // Crear compra
    const nuevaCompra = new Compra({
      productos: productosProcesados,
      cliente,
      total,
      fecha: new Date()
    });

    await nuevaCompra.save();

    res.status(201).json({
      mensaje: "Compra realizada con éxito",
      compra: nuevaCompra
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la compra" });
  }
};

// Obtener todas las compras (para dashboard del admin)
export const obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.find().populate("productos.producto", "name price");
    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las compras" });
  }
};

// Obtener una compra específica
export const obtenerCompraPorId = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id).populate("productos.producto", "name price");
    if (!compra) return res.status(404).json({ error: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la compra" });
  }
};
