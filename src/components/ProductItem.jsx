const ProductItem = ({ product, onEdit, onDelete }) => (
    <div className={`product-item ${product.stock < 10 ? "low-stock" : ""}`}>
        <h3>{product.name}</h3>
        <p>Categoría: {product.category}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        {product.stock < 10 && <span>¡Stock bajo!</span>}
        <button className="edit-button" onClick={onEdit}>
            Editar
        </button>
        <button className="delete-button" onClick={onDelete}>
            Eliminar
        </button>

    </div>
);

export default ProductItem;
