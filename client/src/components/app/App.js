import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Catalog from "../pages/catalog/Catalog";
import Admin from "../pages/admin/Admin";
import AdminLogin from "../pages/adminLogin/AdminLogin";
import { ToastContainer } from "react-toastify";

// перевірка реєстрації
function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMe());
  // }, []);

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/admin/panel" element={<Admin />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
        <ToastContainer autoClose={5000} />
      </div>
    </>
  );
}

export default App;
