import React, { useState } from "react";
import { formatCategory, formatCurrency } from "../../utils";
import "./ProductItem.css";
import { Product } from "../../types";
import { useCartStore } from "../../stores";
interface ProductItemProps {
  product: Product;
}
function ProductItem({ product }: ProductItemProps) {
  const [error, setError] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    setError("");

    addItem({
      ...product,
      size: "M",
      quantity: 1,

      color: "",
    });
  };

  return (
    <div className="product">
      <div className="product-top">
        <div className="badge-container">
          {/* {product.isNew && <span className="new-badge">NEW</span>} */}
          {product.discount !== null && product.discount > 0 && (
            <span className="sale-badge">SALE</span>
          )}
        </div>

        <img
          className="large-img"
          src={product.images[0].imageUrl}
          alt={product.images[0].altText || product.name}
        />
      </div>

      <div className="product-bottom">
        <h2>{product.name}</h2>
        {product.category && (
          <p className="category">{formatCategory(product.category)}</p>
        )}

        {product.discount !== null && product.discount > 0 ? (
          <p className="price">
            {" "}
            <span className="old-price">
              {formatCurrency(product.price)}{" "}
            </span>{" "}
            <span className="sale-price">
              {formatCurrency(product.discount * product.price)}
            </span>
          </p>
        ) : (
          <p className="price">{formatCurrency(product.price)}</p>
        )}

        {/* <div className="options">
          <div>
            <h4>
              Colors <span>(Please Select)</span>
            </h4>
            <div className="colors">
              {product.variants?.colors.map((item: string, index: number) => (
                <div
                  key={index}
                  className={
                    selectedColor === item ? "active-color-container" : ""
                  }
                >
                  <button
                    onClick={() => setSelectedColor(item)}
                    className={
                      selectedColor === item
                        ? "color-box active-color"
                        : "color-box"
                    }
                    style={{ backgroundColor: item }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="size-heading">
              <h4>
                Sizes <span>(Please Select)</span>
              </h4>
              <button onClick={() => navigate("/size-guide")}>
                Size Guide
              </button>
            </div>
            <div className="sizes">
              {product.variants?.sizes.map((size, index) => {
                if (!showMoreSizes) {
                  return (
                    <button
                      onClick={() => onSizePress(size)}
                      key={index}
                      className={`size ${
                        !product.variants?.sizes.includes(size)
                          ? "disabled-size"
                          : ""
                      } ${selectedSize === size ? "active-size" : ""} `}
                    >
                      {size}
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => onSizePress(size)}
                      key={index}
                      className={`size ${
                        !product.variants.sizes.includes(size)
                          ? "disabled-size"
                          : ""
                      } ${selectedSize === size ? "active-size" : ""} `}
                    >
                      {size}
                    </button>
                  );
                }
              })}
              <button
                onClick={() => setShowMoreSizes(!showMoreSizes)}
                className="size-box"
              >
                {showMoreSizes ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        </div> */}

        <div className="add-to-cart-container">
          <p className="error">{error} </p>
          <button className="button-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
