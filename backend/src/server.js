import dotenv from "dotenv";
import path from "path";
import app from "./app.js";
import { connectDB } from "./config/db.js";

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Debug: mostrar variables críticas
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// Verificar que las variables obligatorias existan
if (!process.env.MONGO_URI) {
  console.error("❌ Error: Falta la variable MONGO_URI");
  process.exit(1);
}
if (!process.env.FRONTEND_URL) {
  console.error("❌ Error: Falta la variable FRONTEND_URL");
  process.exit(1);
}

// Conectar a MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  });

// Puerto dinámico para Render
const PORT = process.env.PORT || 5000;

// Escuchar en todas las interfaces (0.0.0.0) para Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
