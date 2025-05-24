import React from "react";
import { useCartStore } from "../../stores";
import { ProductCartItem } from "../../components";
import "./Cart.css";
const Cart = () => {
  const { cart } = useCartStore();
  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <div className="content-grid">
          {cart.map((item) => (
            <ProductCartItem product={item} />
          ))}
        </div>
      ) : (
        <div className="content-centered">
          <h2>Nothing is in your cart yet.</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
