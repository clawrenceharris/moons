import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ShoppingCart } from "../components";

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  function isSameItem(item1, item2) {
    return (
      item1.id === item2.id &&
      item1.selectedColor === item2.selectedColor &&
      item1.selectedSize === item2.selectedSize
    );
  }
  function getItemQuantity(item) {
    return cartItems.find((el) => isSameItem(el, item))?.quantity || 0;
  }
  function increaseCartQuantity(item) {
    setCartItems((currItems) => {
      if (currItems.find((el) => isSameItem(el, item)) == null) {
        return [...cartItems, { ...item, quantity: 1 }];
      } else {
        return cartItems.map((el) => {
          //if the item in the array is the same as the given item
          if (isSameItem(el, item)) {
            //then return that item with increased quantity
            return { ...el, quantity: el.quantity + 1 };
          } else {
            return el;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(item) {
    setCartItems((currItems) => {
      if (currItems.find((el) => isSameItem(el, item)) == null) {
        return cartItems.filter((el) => !isSameItem(el, item));
      } else {
        return cartItems.map((el) => {
          if (isSameItem(el, item)) {
            return { ...el, quantity: item.quantity - 1 };
          } else {
            return el;
          }
        });
      }
    });
  }
  function removeFromCart(item) {
    setCartItems((currItems) => {
      return currItems.filter((el) => !isSameItem(item, el));
    });
  }

  function onCheckout() {
    setCheckout(false);
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (price, item) =>
      item?.salePrice
        ? item.salePrice * item.quantity + price
        : item.price * item.quantity + price,
    0
  );
  return (
    <CartContext.Provider
      style={{ width: "100%", height: "100%" }}
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getItemQuantity,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isCartOpen,
        totalPrice,
        checkout,
        setCheckout,
        onCheckout,
      }}
    >
      <ShoppingCart
        isCartOpen={isCartOpen}
        onCheckoutPress={() => {
          setIsCartOpen(false);
          setCheckout(true);
        }}
      />

      {children}
    </CartContext.Provider>
  );
}
