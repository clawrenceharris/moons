import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../SearchBar";
import { SideBarContentProps } from "../SideBar/SideBar";
import { assets } from "../../assets";

interface NavigationProps extends SideBarContentProps {
  isOpen?: boolean;
}
const NavBar = ({ isOpen, onClose, ...props }: NavigationProps) => {
  return (
    <nav id="nav" {...props}>
      <div className="nav-top">
        <button
          aria-controls="nav"
          autoFocus
          tabIndex={0}
          className="close-btn"
          onClick={onClose}
        >
          <img className="icon" src={assets.close} alt="Close" />
        </button>
        <SearchBar />
        <Link to="/">
          <img className="logo" src={assets.logo} alt="Logo" />
        </Link>
      </div>

      <ul>
        <li>
          <NavLink to="/">
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>Home</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop/category/mens">
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>Men's</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop/category/womens">
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>Women's</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/shop/category/kids"}>
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>Kids'</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/new-arrivals"}>
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>New Arrivals</span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to={"/shop/category/releases"}>
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>Releases</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
