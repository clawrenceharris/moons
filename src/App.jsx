import './App.css';
import Header from './components/Header';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import SizeGuide from './pages/SizeGuide';
import NewArrivals from './pages/NewArrivals';
import { CartProvider, useCart } from './context/CartContext';
import Checkout from './pages/Checkout';
function App() {
  const { checkout } = useCart();
  if (checkout) {
    return <Navigate to={"/checkout"} />
  }
  return (

    <CartProvider>

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/new-arrivals' element={<NewArrivals />} />
          <Route path='/product' element={<Product />} />

          <Route path='/size-guide' element={<SizeGuide />} />
          <Route path='/checkout' element={<Checkout />} />

        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
