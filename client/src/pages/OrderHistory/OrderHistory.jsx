import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import "./style.css";

const OrderHistory = () => {
   const context = useContext(GlobalState);
   const [history] = context.UserAPI.history;

   return (
      <div className="history">
         <h2>History</h2>

         <h3>
            Your have {history.length} order{history.length === 1 ? "" : "s"}.
         </h3>

         <div className="table-container">
            <table>
               <thead>
                  <tr>
                     <th>Payment ID</th>
                     <th>Date of purchase</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  {history.map((item) => (
                     <tr key={item._id}>
                        <td>{item.paymentId}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                           <Link to={`/history/${item._id}`}>View</Link>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default OrderHistory;
