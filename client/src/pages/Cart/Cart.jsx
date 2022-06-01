import "./style.css";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import PayPalButton from "./PayPalButton";

const Cart = () => {
   const context = useContext(GlobalState);
   const [token] = context.token;
   const [cart, setCart] = context.UserAPI.cart;
   const [total, setTotal] = useState(0);

   // calculate the cart total amount
   const calculateTotal = () => {
      const total = cart.reduce((prev, item) => {
         return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
   };

   // add to cart
   const addToCart = async () => {
      await axios.post(
         "/user/addtocart",
         { cart },
         {
            headers: {
               Authorization: token,
            },
         }
      );
   };

   // increment the cart item quantity
   const incrementQuantity = (id) => {
      cart.forEach((item) => {
         if (item._id === id) {
            item.quantity += 1;
         }
      });

      setCart([...cart]);
      addToCart();
   };

   // decrement the cart item quantity
   const decrementQuantity = (id) => {
      cart.forEach((item) => {
         if (item._id === id) {
            item.quantity > 1 ? (item.quantity -= 1) : (item.quantity = 1);
         }
      });

      setCart([...cart]);
      addToCart();
   };

   // remove the product from the cart
   const removeCartItem = (id) => {
      if (window.confirm("Do you really want to remove this product?")) {
         cart.forEach((item, index) => {
            if (item._id === id) {
               cart.splice(index, 1);
            }
         });

         setCart([...cart]);
         addToCart();
      }
   };

   // Paypal Success Handler
   const successHandler = async (payment) => {
      console.log("@@@@ ==> PAYPAL SUCCESS", payment);
   }

   // useEffect
   useEffect(() => {
      calculateTotal();
   }, [cart]);

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
                              <button onClick={() => removeCartItem(item._id)}>
                                 X
                              </button>
                           </td>
                           <td>
                              <img src={item.images[0]} alt={item.title} />
                           </td>
                           <td>{item.title}</td>
                           <td>
                              <div className="amount">
                                 <button
                                    onClick={() => decrementQuantity(item._id)}
                                 >
                                    -
                                 </button>
                                 <span>{item.quantity}</span>
                                 <button
                                    onClick={() => incrementQuantity(item._id)}
                                 >
                                    +
                                 </button>
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
                     <PayPalButton total={total} successHandler={successHandler}/>
                  </span>
               </div>
            </div>
         )}
      </div>
   );
};

export default Cart;
