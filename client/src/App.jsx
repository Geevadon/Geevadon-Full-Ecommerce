import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { GlobalState } from "./GlobalState";
import Cart from "./pages/Cart/Cart";
import Categories from "./pages/Categories/Categories";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";

const App = () => {
   const context = useContext(GlobalState);
   const [isLogged] = context.UserAPI.isLogged;
   const [isAdmin] = context.UserAPI.isAdmin;

   return (
      <Router>
         <div className="app">
            <Header />
            <Routes>
               <Route path="/" exact element={<Products />} />
               <Route path="/cart" element={<Cart />} />
               <Route
                  path="/login"
                  element={isLogged ? <NotFound /> : <Login />}
               />
               <Route
                  path="/register"
                  element={isLogged ? <NotFound /> : <Register />}
               />
               <Route
                  path="/history"
                  element={isLogged ? <OrderHistory /> : <NotFound />}
               />
               <Route
                  path="/history/:id"
                  element={isLogged ? <OrderDetail /> : <NotFound />}
               />
               <Route path="/detail/:id" element={<ProductDetail />} />
               <Route
                  path="/categories/"
                  element={isAdmin ? <Categories /> : <NotFound />}
               />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
