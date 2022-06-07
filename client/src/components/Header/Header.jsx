import "./style.css";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import CartIcon from "./icons/cart.svg";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Header = () => {
   const context = useContext(GlobalState);
   const [isLogged] = context.UserAPI.isLogged;
   const [isAdmin] = context.UserAPI.isAdmin;
   const [cart] = context.UserAPI.cart;
   const [showMobileMenu, setShowMobileMenu] = useState(false);

   const location = useLocation();

   const logoutHandler = async () => {
      try {
         await axios.get("/user/logout");

         localStorage.removeItem("firstLogin");

         window.location.href = "/";
      } catch (err) {
         alert(err.reponse.data.msg);
      }
   };

   const AdminLinks = () => {
      return (
         <>
            <li>
               <Link to="/create-product">Create Product</Link>
            </li>
            <li>
               <Link to="/categories">Categories</Link>
            </li>
         </>
      );
   };

   const LoggedLinks = () => {
      return (
         <>
            <li>
               <Link to="/history">History</Link>
            </li>
            <li>
               <Link to="#" onClick={logoutHandler}>
                  Logout
               </Link>
            </li>
         </>
      );
   };

   const toggleMobileMenu = () => {
      setShowMobileMenu(!showMobileMenu);
   };

   useEffect(() => {
      setShowMobileMenu(false);
   }, [location]);

   return (
      <header>
         <div
            className="mobile-menu"
            style={{ left: showMobileMenu ? 0 : "-100%" }}
         >
            <img
               src={CloseIcon}
               className="close-icon"
               width="30"
               onClick={toggleMobileMenu}
            />
            <ul>
               <li>
                  <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
               </li>

               {isAdmin && <AdminLinks />}

               {isLogged ? (
                  <LoggedLinks />
               ) : (
                  <li>
                     <Link to="/login">Login | Register</Link>
                  </li>
               )}
            </ul>
         </div>

         <img
            src={MenuIcon}
            className="menu-icon"
            width="30"
            onClick={toggleMobileMenu}
         />

         <div className="logo">
            <Link to="/">
               <h1>{isAdmin ? "Admin" : "GFE"}</h1>
            </Link>
         </div>

         <div className="right">
            <ul>
               <li>
                  <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
               </li>

               {isAdmin && <AdminLinks />}

               {isLogged ? (
                  <LoggedLinks />
               ) : (
                  <li>
                     <Link to="/login">Login | Register</Link>
                  </li>
               )}
            </ul>
         </div>
         {!isAdmin && (
            <div className="cart-box">
               <span>{cart.length}</span>
               <Link to="/cart">
                  <img src={CartIcon} alt="" width="30" />
               </Link>
            </div>
         )}
      </header>
   );
};

export default Header;
