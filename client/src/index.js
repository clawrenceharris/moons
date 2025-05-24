import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NavProvider, ShopProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/moons">
      <NavProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </NavProvider>
    </BrowserRouter>
  </React.StrictMode>
);
