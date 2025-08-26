import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Compra } from "../models/compra.model.js";
import { Product } from "../models/product.model.js";
import dotenv from "dotenv";
dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCES_TOKEN,
});

const FRONTEND_URL = process.env.FRONTEND_URL;


// Webhook de MercadoPago
export const procesarPagoWebhook = async (req, res) => {
  try {
    const data = req.body;

    // Confirmar que el pago está aprobado
    if (data.type === "payment") {
      const payment = data.data?.id; // ID del pago
      // Aquí podrías consultar MercadoPago API para confirmar detalles del pago
      // Por ejemplo: https://api.mercadopago.com/v1/payments/{payment}

      // Simulación: obtenemos los items y cliente del body (dependerá de cómo configures)
      const { productos, cliente, total } = data;

      // Actualizar stock y registrar compra
      let productosProcesados = [];

      for (let item of productos) {
        const productoDB = await Product.findById(item.productoId);
        if (!productoDB) continue;

        // Descontar stock
        productoDB.stock -= item.cantidad;
        await productoDB.save();

        productosProcesados.push({
          producto: productoDB._id,
          cantidad: item.cantidad,
          precioUnitario: productoDB.price,
          subtotal: productoDB.price * item.cantidad
        });
      }

      // Crear la compra
      const nuevaCompra = new Compra({
        productos: productosProcesados,
        cliente,
        total,
        fecha: new Date()
      });

      await nuevaCompra.save();

      res.status(200).send("Compra registrada");
    } else {
      res.status(200).send("Evento ignorado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error procesando el pago");
  }
};


export const createOrder = async (req, res) => {
  try {
    const { items, cliente } = req.body; // <-- recibimos items y cliente del frontend

    const preference = new Preference(client);

    // Creamos la preferencia usando los items enviados
    const result = await preference.create({
      body: {
        items: items.map(p => ({
          title: p.title,
          quantity: p.quantity,
          unit_price: p.unit_price,
          currency_id: p.currency_id
        })),
        payer: {
          name: cliente.nombre,
          email: cliente.email
        },
        back_urls: {
          success: `${FRONTEND_URL}/success`,
          failure: `${FRONTEND_URL}/failure`,
          pending: `${FRONTEND_URL}/pending`
        },
        auto_return: "approved"
      }
    });

    res.json({
      id: result.id,
      init_point: result.init_point
    });

  } catch (error) {
    console.error("Error en createPreference:", error);
    res.status(500).json({ error: error.message, details: error });
  }
};



// Maneja éxito del pago
export const successPayment = (req, res) => {
  const { collection_id, preference_id, payment_id, status } = req.query;
  // Acá podés guardar en la DB o loguear
  console.log("Pago aprobado:", { collection_id, preference_id, payment_id, status });
  res.json({ message: "Pago aprobado", collection_id, preference_id, payment_id, status });
};

// Maneja fallo del pago
export const failurePayment = (req, res) => {
  const { collection_id, preference_id, payment_id, status } = req.query;
  console.log("Pago fallido:", { collection_id, preference_id, payment_id, status });
  res.json({ message: "Pago fallido", collection_id, preference_id, payment_id, status });
};

// Maneja pago pendiente
export const pendingPayment = (req, res) => {
  const { collection_id, preference_id, payment_id, status } = req.query;
  console.log("Pago pendiente:", { collection_id, preference_id, payment_id, status });
  res.json({ message: "Pago pendiente", collection_id, preference_id, payment_id, status });
};