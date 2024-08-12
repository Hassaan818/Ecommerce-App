import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import {HelmetProvider} from 'react-helmet-async';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CartScreen from "./pages/CartScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import ShippingScreen from "./pages/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./pages/PaymentScreen.jsx";
import PlaceOrderScreen from "./pages/PlaceOrderScreen.jsx";
import OrderScreen from "./pages/OrderScreen.jsx";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./pages/admin/OrderListScreen.jsx";
import ProductListScreen from "./pages/admin/ProductListScreen.jsx";
import ProductEditScreen from "./pages/admin/ProductEditScreen.jsx";
import UserListScreen from "./pages/admin/UserListScreen.jsx";
import UserEditScreen from "./pages/admin/UserEditScreen.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />

      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
