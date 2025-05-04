import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import heart from "../../assets/images/heart.png";
import cartImg from "../../assets/images/cart.png";
import menuImg from "../../assets/images/menu.png";
import { Link } from "react-router-dom";
import { useCart, useNav } from "../../context/";
import "./Header.css";
import Navigation from "../Navigation";
function Header() {
  const { openCart, cartQuantity } = useCart();
  const { isNavOpen, openNav, closeNav } = useNav();
  

  return (
    <>
   
    <header>
      <div className="header-container">
      <div className="header-left">
        <Link to={"/"}>
          {" "}
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div style={{ display: "flex" }}>
          <button id="sign-up">Sign Up</button>
          <button id="log-in">Log In</button>
        </div>

      </div>


      <div className="header-right">
        
        {isNavOpen ? (
           <button onClick={closeNav}>
           <img className="menu" src={menuImg} alt="menu" />
         </button>
        ) : (
          <button onClick={openNav}>
            <img className="menu" src={menuImg} alt="menu" />
          </button>
        )}
        <input id="searchbar" type="text" placeholder="Search" />

        
        <Link>
          <img className="heart" src={heart} alt="heart" />
        </Link>
        <div style={{ position: "relative" }}>
          <button onClick={openCart}>
            <img className="cart" src={cartImg} alt="cart" />
          </button>
          {cartQuantity > 0 && (
            <button className="cart-badge" onClick={openCart}>
              {cartQuantity}
            </button>
          )}
          </div>
        
        </div>
        </div>
    </header>
      <Navigation />
      </>

  );
}

export default Header;
