import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { GlobalState } from "./GlobalState";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";

const App = () => {
   const context = useContext(GlobalState);
   const [isLogged] = context.UserAPI.isLogged;

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
               <Route path="/detail/:id" element={<ProductDetail />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
