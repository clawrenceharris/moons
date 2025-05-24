import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { assets } from "../../assets";

function Footer() {
  return (
    <footer>
      <button
        style={{ top: 0 }}
        className="link content-centered"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Back To Top
      </button>

      <div className="internal-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/new-arrivals"}>New Arrivals</Link>

        <Link to={"/shop/category/releases"}>Releases</Link>
        <Link to={"/checkout"}>Checkout</Link>

        {/* <button onClick={openCart}>Your Cart</button> */}
        <Link to="/favorites">Your Favorites</Link>
      </div>
      <div className="footer-links">
        <dl>
          <dt className="title">
            <div />
            <h3>About Moons</h3>
          </dt>
          <dd>
            <Link className="link" to="/about">
              About Us
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/careers">
              Careers
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/privacy-policy">
              Privacy Policy
            </Link>
          </dd>
        </dl>
        <dl>
          <dt className="title">
            <div />
            <h3>Support</h3>
          </dt>

          <dd>
            <Link className="link" to="/contact">
              Contact Us
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/returns">
              Returns
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/shipping">
              Shipping
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/terms">
              Terms of Service
            </Link>
          </dd>
          <dd>
            <Link className="link" to="/admin">
              Admin Login
            </Link>
          </dd>
        </dl>
        <div>
          <h3 className="title">
            <div />
            Sign up for our newsletter
          </h3>
          <form action="">
            <label htmlFor="email" className="hidden">
              Enter your email
            </label>
            <input
              className="text-input"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />

            <button className="button-primary">Sign Up</button>
            <p>
              By signing up, you agree to receive marketing emails from Moons.
              You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>

      <div className="copyright">
        <Link to="/">
          <img className="logo" src={assets.logo} alt="moons logo" />
        </Link>
        <p>© 2023 Moons, Inc. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
