import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import CartIcon from "./icons/cart.svg";

const Header = () => {
   const context = useContext(GlobalState);

   return (
      <header className="header-container">
         <p>Header</p>
      </header>
   );
};

export default Header;
