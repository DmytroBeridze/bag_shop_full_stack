import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import Checkout from "../pages/checkout/Checkout";
import OrderAccepted from "../pages/orderAccepted/OrderAccepted";
import NewGoods from "../pages/newGoods/NewGoods";
import Posts from "../pages/admin/Posts";

function App() {
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );

  const location = useLocation();
  const noHeaderFooterPath = [
    "/admin",
    "/admin/panel",
    "/admin/panel/posts",
    "/admin/panel/usersContacts",
    "/admin/panel/usersOrders",
    "/admin/panel/goods",
    "/checkout",
    "/accepted",
  ];
  const showHeaderFooter = !noHeaderFooterPath.includes(location.pathname);

  return (
    <>
      <div className="app">
        {showHeaderFooter && <Header />}

        {/* заключаю весь контент в .content для того, щоб притиснути футер донизу  */}
        <div className="content">
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/accepted" element={<OrderAccepted />} />
            <Route path="/newGoods/:mainType" element={<NewGoods />} />

            {/* Admin panel */}
            <Route path="/admin" element={<AdminLogin />} />
            {/* зірочка- говорить, що в Admin є вкладені роути */}
            <Route path="/admin/panel/*" element={<Admin />} />
            {/* <Route path="/admin/panel/posts" element={<Posts />} /> */}
          </Routes>
        </div>
        <ToastContainer autoClose={5000} />
        {showHeaderFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
