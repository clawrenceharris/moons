import "./styles/global.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { CartToast, Layout } from "./components";
import {
  NewArrivals,
  Checkout,
  Search,
  SizeGuide,
  Product,
  Home,
  Shop,
  Cart,
} from "./pages";
import { useEffect } from "react";
import { AdminPanel, EditProduct } from "./pages/admin";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top every time the path changes
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <CartToast />
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search/:query?" element={<Search />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/product/:id" element={<EditProduct />} />
          <Route path="/admin/search/:query?" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/shop/category/:category/:subcategory?"
            element={<Shop />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
