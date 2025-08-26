import axios from "./axios";

export const getProducts = () => {
  return axios.get("/products");
};

export const addProduct = (producto) => {
  const formData = new FormData();
  formData.append("name", producto.name);
  formData.append("price", producto.price);
  formData.append("stock", producto.stock);
  formData.append("description", producto.description);
  if (producto.imageFile) formData.append("image", producto.imageFile);

  return axios.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
// Podés agregar más funciones para create, update, delete luego
