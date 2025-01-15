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

          <dd>
            <button>About Us</button>
            <button>Career Opportunities</button>
            <button>Privacy Policy</button>
          </dd>
        </div>
        <div>
          <dt className="title">
            <div />
            <h3>Customer Support</h3>
          </dt>
          <dd>
            <button>Ordering Help</button>
            <button>Make a Suggestion</button>
            <button>FAQ's</button>
          </dd>
        </div>
        <div>
          <dt className="title">
            <div />
            <h3>Other Links</h3>
          </dt>

          <dd>
            <a href="https://aacc.edu" rel="noreferrer" target="_blank">
              AACC
            </a>
            <a href="https://instagram.com" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href="https://youtube.com" rel="noreferrer" target="_blank">
              YouTube
            </a>
            <a href="https://facebook.com" rel="noreferrer" target="_blank">
              Facebook
            </a>

            <a href="https://x.com" rel="noreferrer" target="_blank">
              X
            </a>
          </dd>
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
