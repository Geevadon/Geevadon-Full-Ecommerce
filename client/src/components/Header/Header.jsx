import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";
import { Link } from "react-router-dom";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import CartIcon from "./icons/cart.svg";

const Header = () => {
   const context = useContext(GlobalState);

   return (
      <header>
         <div className="menu">
            <img src={MenuIcon} alt="" width="30" />
         </div>

         <div className="logo">
            <Link to="/">
               <h1>GFE</h1>
            </Link>
         </div>

         <div className="right">
            <ul>
               <li>
                  <Link to="/">Products</Link>
               </li>
               <li>
                  <Link to="/login">Login | Register</Link>
               </li>
               <li className="menu">
                  <img src={CloseIcon} alt="" width="30" />
               </li>
            </ul>

            <div className="cart-box">
               <span>0</span>
               <Link to="/cart">
                  <img src={CartIcon} alt="" width="30" />
               </Link>
            </div>
         </div>
      </header>
   );
};

export default Header;
