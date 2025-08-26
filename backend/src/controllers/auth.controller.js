import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ⚡ usuarios simulados en memoria
const users = [
  { id: 1, email: "admin@admin.com", password: bcrypt.hashSync("test", 10) }
];

// 🔑 login
export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

  // generar token
  const token = jwt.sign({ id: user.id }, "secreto_super_seguro", {
    expiresIn: "1h"
  });

  res.json({ token });
};
