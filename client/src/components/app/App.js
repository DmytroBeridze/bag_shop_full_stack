import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Admin from "../pages/admin/Admin";
import AdminLogin from "../pages/adminLogin/AdminLogin";
import Header from "../header/Header";
import Home from "../pages/home/Home";
import Catalog from "../pages/catalog/Catalog";
import Blog from "../pages/blog/Blog";
import Sale from "../pages/sale/Sale";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contactUs/ContactUs";
import CatalogElement from "../pages/catalogElement/CatalogElement";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/catalog/:id" element={<CatalogElement />} />

          <Route path="/blog/:id" element={<ContactUs />} />

          {/* Admin panel */}
          <Route path="/admin/panel" element={<Admin />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
        <ToastContainer autoClose={5000} />
      </div>
    </>
  );
}

export default App;
