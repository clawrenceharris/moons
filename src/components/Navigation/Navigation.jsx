import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNav } from "../../context";

const Navigation = () => {
  const { activeLink, setActiveLink, openNav, closeNav } = useNav();
  const isMobile = window.matchMedia("min-width: 768px");
  useEffect(() => {
    if (isMobile) {
      openNav();
    }
    else {
      closeNav();
    }
  }, [isMobile])
  return (
    <nav id="nav">
      <ul>
        <li>
          <Link
            to={"/"}
            onClick={() => setActiveLink("home")}
            className={activeLink === "home" ? "active-link" : ""}>
            Home{" "}
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveLink("men")}
            className={activeLink === "men" ? "active-link" : ""}>Men</Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveLink("women")}
            className={activeLink === "women" ? "active-link" : ""}>
            Women
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveLink("new arrivals")}
            to={"/new-arrivals"}
            className={activeLink === "new arrivals" ? "active-link" : ""}
          >
            New Arrivals
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveLink("home")}
            className={activeLink === "releases" ? "active-link" : ""}>
            Releases
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;