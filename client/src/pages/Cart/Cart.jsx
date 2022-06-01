import "./style.css";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";

const Cart = () => {
   const context = useContext(GlobalState);
   const [cart] = context.UserAPI.cart;
   const [total, setTotal] = useState(0);

   return (
      <div className="cart">
         {cart.length === 0 ? (
            <h2>Cart Empty</h2>
         ) : (
            <div className="details">
               <h2>Shopping Cart</h2>

               <table>
                  <tbody>
                     {cart.map((item) => (
                        <tr key={item._id}>
                           <td>
                              <button>X</button>
                           </td>
                           <td>
                              <img src={item.images[0]} alt={item.title} />
                           </td>
                           <td>{item.title}</td>
                           <td>
                              <div className="amount">
                                 <button>-</button>
                                 <span>{item.quantity}</span>
                                 <button>+</button>
                              </div>
                           </td>
                           <td>${item.price * item.quantity}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               <div className="total">
                  <h3>Total: ${total}</h3>
                  <span>
                     <Link to="/payment">Payment</Link>
                  </span>
               </div>
            </div>
         )}
      </div>
   );
};

export default Cart;
