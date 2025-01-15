import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ activeLink }) => {
  return (
    <nav id="nav">
      <ul>
        <li>
          <Link to={"/"} className={activeLink === "home" && "active-link"}>
            Home{" "}
          </Link>
        </li>
        <li>
          <Link className={activeLink === "men" && "active-link"}>Men</Link>
        </li>
        <li>
          <Link className={activeLink === "women" && "active-link"}>Women</Link>
        </li>
        <li>
          <Link
            to={"/new-arrivals"}
            className={activeLink === "new arrivals" && "active-link"}
          >
            New Arrivals
          </Link>
        </li>
        <li>
          <Link className={activeLink === "releases" && "active-link"}>
            Releases
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
