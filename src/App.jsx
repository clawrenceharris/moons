import "./styles/global.css";

import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SizeGuide from "./pages/SizeGuide";
import NewArrivals from "./pages/NewArrivals";
import { CartProvider, useCart } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import { Layout } from "./components";
import { useEffect } from "react";
function App() {
  const { checkout } = useCart();

  useEffect(() => {
    console.log("first");
    document.body.scrollTo({ top: 0 });
  }, [window.location]);
  if (checkout) {
    return <Navigate to={"/checkout"} />;
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/product" element={<Product />} />

            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
