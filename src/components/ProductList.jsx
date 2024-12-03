import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig";
import ProductItem from "./ProductItem";

const ProductList = ({ setCurrentProduct, refreshProductsFlag }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(allProducts);
    setFilteredProducts(allProducts); // Inicialmente, los productos filtrados son todos
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar productos por nombre o categoría
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshProductsFlag]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={() => setCurrentProduct(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
