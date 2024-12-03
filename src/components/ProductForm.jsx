import { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

const ProductForm = ({ currentProduct, refreshProducts }) => {
  const [product, setProduct] = useState({ name: "", category: "", price: "", stock: "" });
  const [error, setError] = useState(""); // Para almacenar errores

  // Actualiza el formulario si currentProduct cambia
  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    } else {
      setProduct({ name: "", category: "", price: "", stock: "" });
    }
    setError(""); // Limpiar errores al cambiar de producto
  }, [currentProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar error antes de validar

    try {
      // Validar si el producto ya existe
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("name", "==", product.name));
      const querySnapshot = await getDocs(q);

      if (!currentProduct && !querySnapshot.empty) {
        // Si se está creando un producto nuevo y ya existe uno con el mismo nombre
        setError("Ya existe un producto con este nombre.");
        return;
      }

      if (currentProduct) {
        // Actualizar producto existente
        await updateDoc(doc(db, "products", currentProduct.id), product);
      } else {
        // Crear nuevo producto
        await addDoc(collection(db, "products"), product);
      }

      setProduct({ name: "", category: "", price: "", stock: "" }); // Limpiar formulario
      refreshProducts(); // Refrescar la lista
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError("Ocurrió un error al guardar el producto. Intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={product.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Cantidad en stock"
        value={product.stock}
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
      <button type="submit">{currentProduct ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default ProductForm;
