import React, { forwardRef } from "react";
import { assets } from "../../../assets";
import "./CartButton.css";
import { useCartStore } from "../../../stores";
import { useNavigate } from "react-router-dom";

interface CartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  badgeStyle?: React.CSSProperties;
}
const CartButton = forwardRef<HTMLButtonElement, CartButtonProps>(
  ({ badgeStyle, ...props }, ref) => {
    const cart = useCartStore((s) => s.cart);
    const navigate = useNavigate();
    return (
      <button
        onClick={() => navigate("/cart")}
        aria-label="View cart"
        ref={ref}
        className="cart-btn"
        {...props}
      >
        <img className="icon" src={assets.cart} alt="cart" />
        {cart.length > 0 && <div className="cart-badge" style={badgeStyle} />}
      </button>
    );
  }
);
export default CartButton;
