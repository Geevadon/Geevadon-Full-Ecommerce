import "./style.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product, isAdmin }) => {
   return (
      <div className="product-card">
         {isAdmin && <input type="checkbox" checked={product.checked}></input>}

         <img src={product.images[0]} alt={product.title} />

         <div className="product-details">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>

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
                     <Link to="#" className="btn-buy">
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
