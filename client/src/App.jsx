import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { DataProvider } from "./GlobalState";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";

const App = () => {
   return (
      <DataProvider>
         <Router>
            <div className="app">
               <Header />
               <Routes>
                  <Route path="/" exact element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </div>
         </Router>
      </DataProvider>
   );
};

export default App;
