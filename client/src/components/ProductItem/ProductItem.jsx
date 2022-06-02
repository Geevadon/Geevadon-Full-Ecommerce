import "./style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { textSubstring } from "../../utils";

const ProductItem = ({ product }) => {
   const context = useContext(GlobalState);

   const [isAdmin] = context.UserAPI.isAdmin;
   const addToCart = context.UserAPI.addToCart;

   return (
      <div className="product-card">
         {isAdmin && <input type="checkbox" checked={product.checked}></input>}

         <img src={product.images[0]} alt={product.title} />

         <div className="product-details">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
            <p>{textSubstring(product.description, 90)}</p>

            <div className="btn-container">
               {isAdmin ? (
                  <>
                     <Link to="#" className="btn-view">
                        Delete
                     </Link>
                     <Link to={`/edit/${product._id}`} className="btn-buy">
                        Edit
                     </Link>
                  </>
               ) : (
                  <>
                     <Link
                        to="#"
                        className="btn-buy"
                        onClick={() => addToCart(product)}
                     >
                        Buy
                     </Link>
                     <Link to={`/detail/${product._id}`} className="btn-view">
                        View
                     </Link>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default ProductItem;
