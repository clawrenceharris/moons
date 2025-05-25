import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { assets } from "../../assets";
import { useMediaQuery } from "@react-hook/media-query";
import SearchBar from "../SearchBar";
import { CartButton, MenuButton } from "../buttons/";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuButtonElement = (): HTMLButtonElement | null => {
    const menuBtn = document.getElementById("menu-btn");
    return menuBtn as HTMLButtonElement;
  };
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("screen and (min-width: 720px)");

  const onOpenNav = () => {
    setIsNavOpen(true);
  };
  const onCloseNav = () => {
    setIsNavOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header
        ? header.getBoundingClientRect().height + 100
        : 80;
      setShowMenu(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      {!showMenu && (
        <div className="header-container">
          <div className="header-left">
            <Link to={"/"}>
              {" "}
              <img className="logo" src={assets.logo} alt="logo" />
            </Link>
            <div style={{ display: "flex" }}>
              <button
                tabIndex={showMenu ? -1 : undefined}
                aria-hidden={showMenu}
                id="sign-up"
              >
                Sign Up
              </button>
              <button
                tabIndex={showMenu ? -1 : undefined}
                aria-hidden={showMenu}
                id="log-in"
              >
                Log In
              </button>
            </div>
          </div>

          <div className="header-right">
            <MenuButton
              id={!showMenu ? "menu-btn" : undefined}
              aria-controls="nav"
              aria-expanded={!isDesktop ? isNavOpen : undefined}
              onClick={onOpenNav}
            />

            <SearchBar
              tabIndex={showMenu ? -1 : undefined}
              aria-hidden={showMenu}
            />
            <Link
              aria-label="View favorites"
              tabIndex={showMenu ? -1 : undefined}
              aria-hidden={showMenu}
              to={"/favorites"}
            >
              <img className="heart" src={assets.heart} alt="heart" />
            </Link>
            <CartButton disabled={showMenu} />
          </div>
        </div>
      )}

      <SideBar
        direction="left"
        triggerButton={menuButtonElement()}
        onClose={onCloseNav}
        isOpen={isNavOpen}
      >
        <NavBar aria-hidden={!isNavOpen} className="secondary" />
      </SideBar>

      {!showMenu && !isNavOpen && <NavBar className="main" />}

      <div
        role="region"
        aria-label="Sticky navigation bar"
        aria-hidden={!showMenu}
        className={`sticky-header
        ${showMenu ? "open" : "closed"}
          `}
      >
        <MenuButton
          id={showMenu ? "menu-btn" : undefined}
          aria-controls="nav"
          tabIndex={0}
          autoFocus
          aria-expanded={isNavOpen}
          onClick={onOpenNav}
        />
        <div className="content-row">
          <Link
            aria-label="View favorites"
            tabIndex={!showMenu ? -1 : undefined}
            aria-hidden={!showMenu}
            to={"/favorites"}
          >
            <img className="icon" src={assets.heart} alt="heart" />
          </Link>
          <CartButton
            ref={cartButtonRef}
            badgeStyle={{ borderColor: "white" }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
