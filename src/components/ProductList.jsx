import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig";
import ProductItem from "./ProductItem";

const ProductList = ({ setCurrentProduct, refreshProductsFlag }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshProductsFlag]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => setCurrentProduct(product)}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
