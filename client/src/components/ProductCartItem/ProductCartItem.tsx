import React from "react";
import { formatCurrency } from "../../utils";
import "./ProductCartItem.css";
import { CartItem } from "../../types";
import { useCartStore } from "../../stores";
import { assets } from "../../assets";

function ProductCartItem({ product }: { product: CartItem }) {
  useCartStore((s) => s.cart);
  const increment = useCartStore((s) => s.incrementItemQuantity);
  const decrement = useCartStore((s) => s.decrementItemQuantity);

  return (
    <div className="product-cart-item">
      <div className="product-top">
        <img
          alt={product.images[0].altText || product.name}
          src={product.images[0].imageUrl}
        />
      </div>

      <div className="product-bottom">
        <div>
          <h3>{product.name}</h3>

          {product?.discount ? (
            <p className="price">{formatCurrency(product.discount)}</p>
          ) : (
            <p style={{ fontFamily: "Dunbar" }} className="price">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
        <div>
          <div className="quantity">
            <button onClick={() => decrement(product.id)}>
              <img src={assets.minus} className="icon" alt="Add" />
            </button>
            <p>{product.quantity}</p>

            <button onClick={() => increment(product.id)}>
              <img src={assets.plus} className="icon" alt="Add" />
            </button>
          </div>
        </div>

        <div>
          <p className="size">
            {" "}
            {product.size} {product.category}
          </p>
        </div>

        <div>
          <div
            className="color-box"
            style={{ backgroundColor: product.color }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
