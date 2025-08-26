import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });



console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

// el resto de importaciones y código abajo...
import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
