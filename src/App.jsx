import "./styles/globals.css";

import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SizeGuide from "./pages/SizeGuide";
import NewArrivals from "./pages/NewArrivals";
import { CartProvider, useCart } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import { Layout } from "./components";
function App() {
  const { checkout } = useCart();
  if (checkout) {
    return <Navigate to={"/checkout"} />;
  }
  return (
    <CartProvider>
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
    </CartProvider>
  );
}

export default App;
