import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.css";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
        

        <main>

          <Outlet />

        </main>
        <Footer />

    </div>
  );
};

export default Layout;
