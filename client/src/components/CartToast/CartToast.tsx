import React, { useCallback, useEffect, useState } from "react";
import { useCartStore } from "../../stores";
import "./CartToast.css";
import { CartItem } from "../../types";
import { assets } from "../../assets";
import { useNavigate } from "react-router-dom";
export default function CartToast() {
  const cart = useCartStore((s) => s.cart);
  const [lastItem, setLastItem] = useState<CartItem | null>(null);
  const navigate = useNavigate();
  const showToast = useCallback(() => {
    const cartToast = document.getElementById("cart-toast");
    cartToast?.classList.add("visible");
    setLastItem(cart[cart.length - 1]);
  }, [cart]);
  const hideToast = () => {
    const cartToast = document.getElementById("cart-toast");

    setLastItem(null);

    cartToast?.classList.remove("visible");
  };
  useEffect(() => {
    if (!cart.length) {
      hideToast();
      return;
    }
    showToast();
    const timeout = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [cart.length, showToast]);
  const handleCartClick = () => {
    navigate("/cart");
    hideToast();
  };
  const handleCheckoutClick = () => {
    navigate("/checkout");
    hideToast();
  };
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      id="cart-toast"
      className="cart-toast-container"
    >
      {lastItem && (
        <div className="toast-content">
          <button
            onClick={hideToast}
            className="close-btn button-circle"
            type="button"
          >
            <img src={assets.close} alt="Close" className="icon" />
          </button>
          <div className="cart-toast-container-top">
            <img
              src={lastItem?.images[0].imageUrl}
              alt={lastItem.images[0].imageUrl || lastItem.name}
            />
          </div>
          <div className="cart-toast-container-bottom">
            <div>
              <p>{lastItem.quantity} item(s) added to cart!</p>

              <h2>{lastItem.name}</h2>
            </div>

            <div className="content-row">
              <button onClick={handleCartClick} className="button-primary">
                Cart
              </button>
              <button onClick={handleCheckoutClick} className="button-primary">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
