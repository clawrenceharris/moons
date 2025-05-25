import React from "react";
import { Link } from "react-router-dom";
import "./ProductGridItem.css";
import { Product } from "../../../../types";
import "../../styles/shared/_product.css";
import { formatCategory, formatCurrency } from "../../utils";
import { useShop } from "../../context";

function ProductGridItem({ product }: { product: Product }) {
  const { flags = [] } = useShop();
  if (!product) {
    return null;
  }
  return (
    <Link
      to={`/product/${product.id}`}
      state={product}
      className="product-grid-item"
    >
      <div className="product-top">
        <div className="badge-container">
          {flags.some((item) => item.name === "New") && (
            <span className="new-badge">NEW</span>
          )}
          {((product.discount != null && product.discount > 0) ||
            flags.some((item) => item.name === "Sale")) && (
            <span className="sale-badge">SALE</span>
          )}
        </div>

        {product?.images.length > 0 && (
          <img
            src={product.images[0].imageUrl}
            alt={product.images[0].altText || product.name}
          />
        )}
      </div>

      <div className="product-bottom">
        <h3>{product.name}</h3>
        {product.category && (
          <p className="category">{formatCategory(product.category)}</p>
        )}

        {product.discount ? (
          <p className="price">
            {" "}
            <span className="old-price">
              {formatCurrency(product.price)}{" "}
            </span>{" "}
            <span className="sale-price">
              {formatCurrency(product.price * product.discount)}
            </span>
          </p>
        ) : (
          <p className="price">{formatCurrency(product.price)}</p>
        )}

        {/* {item.reviews.length > 0 && (
          <div className="stars">
            {Array(
              Math.round(
                item.reviews.reduce((stars, item) => item.stars + stars, 0) /
                  item.reviews.length
              )
            )
              .fill("")
              .map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
          </div>
        )} */}
      </div>
    </Link>
  );
}

export default ProductGridItem;
