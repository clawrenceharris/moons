import React from "react";
import { useCart } from "../../context/";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ProductCartItem.css";

function ProductCartItem({ item }) {
  const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } =
    useCart();

  return (
    <div className="product-cart-item">
      <div className="product-top">
        <img alt={item.name} src={item.srcset[0]} />
      </div>

      <div className="product-bottom">
        <h3>{item.name}</h3>

        <div className="details">
          <h5>Price</h5>
          {item?.salePrice ? (
            <p style={{ fontFamily: "Dunbar" }} className="price">
              {formatCurrency(item.salePrice)}
            </p>
          ) : (
            <p style={{ fontFamily: "Dunbar" }} className="price">
              {formatCurrency(item.price)}
            </p>
          )}
          <h5>Qty</h5>
          <div className="quantity">
            <p style={{ fontFamily: "Dunbar" }}>{item.quantity}</p>

            <button
              onClick={() => item.quantity > 1 && decreaseCartQuantity(item)}
            >
              -
            </button>
            <button onClick={() => increaseCartQuantity(item)}>+</button>
          </div>
          <h5>Size</h5>
          <p style={{ fontFamily: "Dunbar" }} className="size">
            {" "}
            {item.selectedSize} {item.type}
          </p>

          <h5>Color</h5>
          <div
            className="color-box"
            style={{ backgroundColor: item.selectedColor }}
          />
        </div>
        <div className="actions">
          <button onClick={() => {}} className="edit-btn">
            Edit
          </button>

          <button onClick={() => removeFromCart(item)} className="remove-btn">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
