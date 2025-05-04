import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ProductItem.css";

function Product({ product }) {
  const sizes = ["7.5", "8.0", "8.5", "9.0", "9.5", "10.5"];
  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [error, setError] = useState("");
  const { increaseCartQuantity } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const onAddToCartPress = () => {
    setError("");
    if (!selectedSize) {
      return setError("Please select a size");
    }
    if (!selectedColor) {
      return setError("Please select a color");
    }

    increaseCartQuantity({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    });
  };
  const sizeClassName = (item) => {
    let className = "size-box";
    if (!product.sizes.includes(item)) {
      className += " disabled-size";
    } else {
      className += " enabled-size";
    }
    if (selectedSize === item) {
      className += " active-size";
    }
    return className;
  };

  const onSizePress = (item) => {
    if (product.sizes.includes(item)) {
      setSelectedSize(item);
    }
  };
  return (
    <div className="product">
      <div className="product-top">
        <div className="badge-container">
          {product.isNew && <span className="new-badge">NEW</span>}
          {product.salePrice > 0 && <span className="sale-badge">SALE</span>}
        </div>

        <img
          className="large-img"
          src={product.srcset[imageIndex]}
          alt={product.name}
        />

        <div className="thumbnail-images">
          {product.srcset.length > 1 &&
            product.srcset.map((item, index) => (
              <button key={index} onClick={() => setImageIndex(index)}>
                <img className="img-thumbnail" src={item} alt={product.name} />
              </button>
            ))}
        </div>
      </div>

      <div className="product-bottom">
        <h2>{product.name}</h2>
        <p className="type">{product.type}</p>

        {product.salePrice > 0 ? (
          <p className="price">
            {" "}
            <span className="old-price">
              {formatCurrency(product.price)}{" "}
            </span>{" "}
            <span className="sale-price">
              {formatCurrency(product.salePrice)}
            </span>
          </p>
        ) : (
          <p className="price">{formatCurrency(product.price)}</p>
        )}

        <div className="options">
          <div>
            <h4>
              Colors <span>(Please Select)</span>
            </h4>
            <div className="colors">
              {product.colors.map((item, index) => (
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
              <button
                onClick={() => navigate("/size-guide", { state: product })}
              >
                Size Guide
              </button>
            </div>
            <div className="sizes">
              {sizes.map((item, index) => {
                if (!showMoreSizes) {
                  return (
                    <button
                      onClick={() => onSizePress(item)}
                      key={index}
                      className={sizeClassName(item)}
                    >
                      {item}
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => onSizePress(item)}
                      key={index}
                      className={sizeClassName(item)}
                    >
                      {item}
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
        </div>

        <div className="add-to-cart-container">
          <p className="error">{error} </p>
          <button onClick={onAddToCartPress}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
