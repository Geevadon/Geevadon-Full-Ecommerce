import axios from "axios";
import { useEffect, useState } from "react";

const UserAPI = (token) => {
   const [isLogged, setIsLogged] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [cart, setCart] = useState([]);
   const [history, setHistory] = useState([]);
   const [callback, seCallback] = useState(false);

   const getUser = async () => {
      try {
         const res = await axios.get("/user/me", {
            headers: {
               Authorization: token,
            },
         });

         // set isLogged to true
         setIsLogged(true);

         // set the cart
         setCart(res.data.cart);

         // set isAdmin to true if the role is 1.
         res.data.role === 1 && setIsAdmin(true);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   const getHistory = async () => {
      try {
         if (isAdmin) {
            const res = await axios.get("/api/payment", {
               headers: {
                  Authorization: token,
               },
            });

            setHistory(res.data);
         } else {
            const res = await axios.get("/user/history", {
               headers: {
                  Authorization: token,
               },
            });

            setHistory(res.data);
         }
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   const addToCart = async (product) => {
      if (!isLogged) {
         return alert("Please login to continue buying.");
      }

      // Make sure the same product is not added multiple times in the cart. It has to be added just once.
      const check = cart.every((item) => {
         return item._id !== product._id;
      });

      if (check) {
         setCart([...cart, { ...product, quantity: 1 }]);

         await axios.post(
            "/user/addtocart",
            { cart: [...cart, { ...product, quantity: 1 }] },
            {
               headers: {
                  Authorization: token,
               },
            }
         );
      } else {
         alert("This product has already been added to cart.");
      }
   };

   useEffect(() => {
      if (token) {
         getUser();
         getHistory();
      }
   }, [token, callback, isAdmin]);

   return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
      cart: [cart, setCart],
      addToCart: addToCart,
      history: [history, setHistory],
      callback: [callback, seCallback],
   };
};

export default UserAPI;
