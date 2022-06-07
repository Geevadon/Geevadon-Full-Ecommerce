import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";
import "./style.css";

const OrderDetail = () => {
   const context = useContext(GlobalState);
   const [history] = context.UserAPI.history;
   const params = useParams();
   const [orderDetails, setOrderDetails] = useState({});

   useEffect(() => {
      if (params.id) {
         history.forEach((item) => {
            if (item._id === params.id) {
               setOrderDetails(item);
            }
         });
      }
   }, [params]);

   if (Object.keys(orderDetails).length === 0) return null;

   return (
      <div className="details-container">
         <h2>Order Details</h2>

         <div className="table-container">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Address</th>
                     <th>Postal code</th>
                     <th>Country code</th>
                  </tr>
               </thead>

               <tbody>
                  <tr>
                     <td>{orderDetails.address.recipient_name}</td>
                     <td>{`${orderDetails.address.city}, ${orderDetails.address.line1} `}</td>
                     <td>{orderDetails.address.postal_code}</td>
                     <td>{orderDetails.address.country_code}</td>
                  </tr>
               </tbody>
            </table>
            <table className="product-table">
               <thead>
                  <tr>
                     <th></th>
                     <th>Product</th>
                     <th>Quantity</th>
                     <th>Price</th>
                  </tr>
               </thead>

               <tbody>
                  {orderDetails.cart.map((item) => (
                     <tr key={item._id}>
                        <td>
                           <img src={item.images.url} alt={item.title} />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.quantity * item.price}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default OrderDetail;
