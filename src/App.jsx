import Home from "./components/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import { Box, CssBaseline } from "@mui/material";
import ProductDetails from "./components/ProductDetails";
import Contact from "./components/Contact";
import Sginin from "./components/Sginin";
import SginUp from "./components/SginUp";
import Chechout from "./components/Chechout";
import SginSuccsefuly from "./components/SginSuccsefuly";
import Dashboard from "./screen/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Users from "./screen/Users";
import Anlsity from "./screen/Anlsity";
import Orders from "./screen/Orders";
import OrderDetalis from "./components/OrderDetalis";
import CheckoutSucsse from "./components/CheckoutSucsse";
import useVisitor from "./components/useVisitor";


function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');
 useVisitor()
  return (
    <>
    <CssBaseline/>
      <Navbar />
      <Box  >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/cart" element={<CartPage/>}/>
        <Route  path="/produtdetails/:id" element={<ProductDetails/>}/>
        <Route  path="/contact" element={<Contact/>}/>
        <Route  path="/sginin" element={<Sginin/>}/>
        <Route  path="/sginup" element={<SginUp/>}/>
        <Route  path="/chechout" element={<Chechout/>}/>
        <Route  path="/sginsuccsefuly" element={<SginSuccsefuly/>}/>
        <Route  path="/checkoutsucsse" element={<CheckoutSucsse/>}/>
        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Anlsity />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="ordersdetalis/:id" element={<OrderDetalis />} />
          </Route>
        </Route>
      </Routes>
      {!isDashboardPage && <Footer/>}
           

      </Box>


    </>
  )
}

export default App ;