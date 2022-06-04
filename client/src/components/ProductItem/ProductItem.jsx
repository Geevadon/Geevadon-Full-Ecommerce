import "./style.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { textSubstring } from "../../utils";
import axios from "axios";

const ProductItem = ({ product }) => {
   const context = useContext(GlobalState);

   const [isAdmin] = context.UserAPI.isAdmin;
   const addToCart = context.UserAPI.addToCart;
   const [token] = context.token;
   const [products, setProducts] = context.ProductAPI.products;
   const [productCallback, setProductCallback] =
      context.ProductAPI.productCallback;
   const [loading, setLoading] = useState(false);

   // Delete product handler
   const deleteHandler = async () => {
      try {
         if (window.confirm("Delete this product?")) {
            setLoading(true);
            // Delete the old product image
            await axios.post(
               "/api/delete-img",
               { publicId: product.images.publicId },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            // Delete the product
            const res = await axios.delete(`/api/products/${product._id}`, {
               headers: { Authorization: token },
            });

            setLoading(false);
            setProductCallback(!productCallback);
            alert(res.data.msg);
         }
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   // Check product handler
   const checkHandler = async () => {
      try {
         const productsCopy = [...products];

         productsCopy.forEach((p) => {
            if (p._id === product._id) {
               p.checked = !p.checked;
            }
         });

         setProducts(productsCopy);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   return (
      <div className="product-card">
         {isAdmin && (
            <input
               type="checkbox"
               checked={product.checked}
               onChange={checkHandler}
            ></input>
         )}

         <img src={product.images.url} alt={product.title} />

         <div className="product-details">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
            <p>{textSubstring(product.description, 90)}</p>

            <div className="btn-container">
               {isAdmin ? (
                  <>
                     <Link to="#" className="btn-view" onClick={deleteHandler}>
                        {loading ? "Deleting..." : "Delete"}
                     </Link>
                     <Link
                        to={`/edit-product/${product._id}`}
                        className="btn-buy"
                     >
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
