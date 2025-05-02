import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductListItem.css";

function ProductListItem({ product }) {
  const navigate = useNavigate();

  return (
    <div className="product-item">
      {<img src={product.srcset[0]} alt={product.name} />}
      <h5>{product.name}</h5>

      <button
        className="button-primary"
        onClick={() => navigate("/product", { state: product })}
      >
        SHOP
      </button>
    </div>
  );
}

export default ProductListItem;
