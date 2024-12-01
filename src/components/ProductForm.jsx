import { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig";

const ProductForm = ({ currentProduct, refreshProducts }) => {
  const [product, setProduct] = useState({ name: "", category: "", price: "", stock: "" });

  // Actualiza el formulario si currentProduct cambia
  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    } else {
      setProduct({ name: "", category: "", price: "", stock: "" });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentProduct) {
      await updateDoc(doc(db, "products", currentProduct.id), product);
    } else {
      await addDoc(collection(db, "products"), product);
    }
    setProduct({ name: "", category: "", price: "", stock: "" });
    refreshProducts();
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
      <button type="submit">{currentProduct ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default ProductForm;
