import { createContext, useState, useEffect } from "react";
import { getProducts, addProduct as apiAddProduct } from "../api/products";
import React from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev; // opcional: evitar duplicados
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  // Función para agregar un producto al backend y al state
  const addNewProduct = async (productData) => {
    try {
      const res = await apiAddProduct(productData); // API retorna el producto creado
      setProducts(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Error al agregar producto:", err);
      throw err; // para que el componente pueda manejarlo
    }
  };

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // productos filtrados según la categoría
  const filteredProducts = filteredCategory
    ? products.filter(p => p.category === filteredCategory)
    : products;

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,
        loading,
        error,
        setFilteredCategory,
        addToCart,
        cart,
        removeFromCart,
        addNewProduct // <-- agregamos esta función
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
