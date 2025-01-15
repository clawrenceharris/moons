import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.css";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <main>
      <div>
        <Header />
        <Navigation />
        <div style={{ marginLeft: "20%" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
