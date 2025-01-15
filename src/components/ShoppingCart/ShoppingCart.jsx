import React from "react";
import { useCart } from "../../context/CartContext";
import ProductCartItem from "../ProductCartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ShoppingCart.css";

function ShoppingCart({ isCartOpen, onCheckoutPress }) {
  const { closeCart, cartItems, totalPrice } = useCart();

  return (
    <div
      id="cart-menu"
      className="cart-menu"
      style={{
        padding: isCartOpen ? "10px" : "0",
        width: isCartOpen ? "70%" : "0",
      }}
    >
      <div style={{ opacity: isCartOpen ? 1 : 0 }}>
        <div className="cart-heading">
          <h2>Your Cart</h2>
          <h2 className="close" onClick={closeCart}>
            &times;
          </h2>
        </div>
        <div style={{ marginBottom: "120px" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ProductCartItem key={item.id} item={item} />
            ))
          ) : (
            <p className="empty-text">Nothing is in your cart yet.</p>
          )}
        </div>
        <div className="cart-bottom">
          <h3>
            Subtotal: <span>{formatCurrency(totalPrice)}</span>
          </h3>

          <button
            style={{ display: "flex", alignItems: "center" }}
            onClick={onCheckoutPress}
            className={
              cartItems.length > 0 ? "button-filled" : "button-disabled"
            }
          >
            Checkout
            <span style={{ marginLeft: "5px" }} className="chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
