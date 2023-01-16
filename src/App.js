import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminOnly from "./components/admin&proctedOnly/AdminOnly";
import NoMatchRoute from "./components/NoMatchRoute";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../src/components/navbar/Navbar";
import Footer from "../src/components/footer/Footer";
import Home from "../src/pages/home/Home";

const LazyContact = lazy(() => import("../src/pages/contact/Contact"));
const LazyReset = lazy(() => import("./pages/auth/Reset"));

const LazyAdmin = lazy(() => import("./pages/admin/Admin"));
const LazyLogin = lazy(() => import("./pages/auth/Login"));
const LazyProductDetails = lazy(() =>
  import("./components/product/productDetails/ProductDetails")
);
const LazyRegister = lazy(() => import("./pages/auth/Register"));
const LazyCart = lazy(() => import("./pages/cart/Cart"));

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contact"
          element={
            <Suspense fallback="Loading...">
              <LazyContact />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback="Loading...">
              <LazyRegister />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback="Loading...">
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path="/reset"
          element={
            <Suspense fallback="Loading...">
              <LazyReset />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback="Loading...">
              <LazyCart />
            </Suspense>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Suspense fallback="Loading...">
              <LazyProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminOnly>
              <Suspense fallback="Loading...">
                <LazyAdmin />
              </Suspense>
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
