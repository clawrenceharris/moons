import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider, NavProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavProvider>
      <CartProvider>

       
          <App />
       
         
        </CartProvider>
    </NavProvider>
   
  </React.StrictMode>
);
