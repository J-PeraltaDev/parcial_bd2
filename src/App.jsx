import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);

  const refreshProducts = () => {
    setCurrentProduct(null);
    setRefreshProductsFlag(!refreshProductsFlag);
  };

  return (
    <div className="container">
      <h1>Inventario</h1>
      <ProductForm
        currentProduct={currentProduct}
        refreshProducts={refreshProducts}
      />
      <ProductList
        setCurrentProduct={setCurrentProduct}
        refreshProductsFlag={refreshProductsFlag}
      />
    </div>
  );
};

export default App;
