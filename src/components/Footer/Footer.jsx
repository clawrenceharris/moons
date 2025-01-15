import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Footer.css";

function Footer() {
  const { openCart } = useCart();
  return (
    <footer>
      <div className="internal-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/new-arrivals"}>New Arrivals</Link>
        <Link>Releases</Link>
        <button onClick={openCart}>Your Cart</button>
        <Link>Your Favorites</Link>

        <Link>Join Mailinglist</Link>
      </div>
      <dl>
        <div>
          <dt className="title">
            <div />
            <h3>About Moons</h3>
          </dt>

          <dd>About Us</dd>
          <dd>Career Opportunities</dd>
          <dd>Privacy Policy</dd>
        </div>
        <div>
          <dt className="title">
            <div />
            <h3>Customer Support</h3>
          </dt>
          <dd>Ordering Help</dd>
          <dd>Make a Suggestion</dd>
          <dd>FAQ's</dd>
        </div>
      </dl>

      <div className="copyright">
        <a href="index.html">
          <img className="logo" src={logo} alt="moons logo" />
        </a>
        <p>© 2023 Moons, Inc. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
