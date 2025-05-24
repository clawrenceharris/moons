import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.css";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
