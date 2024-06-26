import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import AddCategory from "./pages/addCategory/AddCategory";
import AddClient from "./pages/addClient/AddClient";
import CategoryList from "./pages/categoryList/CategoryList";
import AddSupplier from "./pages/addSupplier/AddSupplier";
import SupplierList from "./pages/supplierList/SupplierList";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import EditCategory from "./pages/editCategory/EditCategory";
import ClientList from "./components/client/clientList/ClientList";
import EditClient from "./pages/editClient/EditClient";
import AddCommand from "./pages/addCommand/AddCommand";
import CommandList from "./components/command/commandList/CommandList";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-command"
          element={
            <Sidebar>
              <Layout>
                <AddCommand />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="commands-list"
          element={
            <Sidebar>
              <Layout>
                <CommandList />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-client"
          element={
            <Sidebar>
              <Layout>
                <AddClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/clients-list"
          element={
            <Sidebar>
              <Layout>
                <ClientList />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/edit-client/:id"
          element={
            <Sidebar>
              <Layout>
                <EditClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-category"
          element={
            <Sidebar>
              <Layout>
                <AddCategory />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/categories-list"
          element={
            <Sidebar>
              <Layout>
                <CategoryList />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <Sidebar>
              <Layout>
                <EditCategory />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-supplier"
          element={
            <Sidebar>
              <Layout>
                <AddSupplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/suppliers-list"
          element={
            <Sidebar>
              <Layout>
                <SupplierList />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
