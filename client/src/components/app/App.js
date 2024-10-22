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
import Footer from "../footer/Footer";
import Post from "../pages/post/Post";
import CatalogGalery from "../catalogPage/CatalogGalery";
import { useSelector } from "react-redux";

function App() {
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );
  // const saleItems = goods.filter((elem) => elem.sale !== "false");

  return (
    <>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/sale/:mainType" element={<Sale />} />
          {/* <Route
            path="/sale/:mainType"
            element={
              <CatalogGalery
                goods={saleItems}
                isloading={isloading}
                status={status}
              />
            }
          /> */}
          {/* <Route path="/sale" element={<Sale />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/catalog/:id" element={<CatalogElement />} />
          <Route
            path="/catalog/galery/:mainType"
            element={
              <CatalogGalery
                goods={goods}
                isloading={isloading}
                status={status}
                title="Catalog"
              />
            }
          />

          <Route path="/blog/:id" element={<Post />} />

          {/* Admin panel */}
          <Route path="/admin/panel" element={<Admin />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
        <ToastContainer autoClose={5000} />
        <Footer />
      </div>
    </>
  );
}

export default App;
