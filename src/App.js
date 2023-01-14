import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/navbar/Navbar";
import Footer from "../src/components/footer/Footer";
import Home from "../src/pages/home/Home";
import Contact from "../src/pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NoMatchRoute from "./components/NoMatchRoute";
import AdminOnly from "./components/admin&proctedOnly/AdminOnly";
import Admin from "./pages/admin/Admin";
import NoMatchRoute from "./components/NoMatchRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route
          path="/admin"
          element={
            <AdminOnly>
              <Admin />
            </AdminOnly>
          }
        />
        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
