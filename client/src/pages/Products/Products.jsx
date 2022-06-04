import { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ProductItem from "../../components/ProductItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import "./style.css";
import axios from "axios";

const Products = () => {
   const context = useContext(GlobalState);

   const [products, setProducts] = context.ProductAPI.products;
   const [isAdmin] = context.UserAPI.isAdmin;
   const [token] = context.token;
   const [productLoading] = context.ProductAPI.productLoading;
   const [productCallback, setProductCallback] =
      context.ProductAPI.productCallback;
   const [isCheckedAll, setISCheckedAll] = useState(false);
   const [loading, setLoading] = useState(false);

   // Detele product handler
   const deleteProduct = async (product) => {
      try {
         setLoading(true);

         await axios.post(
            "/api/delete-img",
            { publicId: product.images.publicId },
            {
               headers: {
                  Authorization: token,
               },
            }
         );

         await axios.delete(`/api/products/${product._id}`, {
            headers: {
               Authorization: token,
            },
         });

         setLoading(false);
         setProductCallback(!productCallback);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   // Check all handler
   const checkAllHandler = () => {
      const productsCopy = [...products];

      productsCopy.forEach((product) => {
         product.checked = !isCheckedAll;
      });

      setProducts(productsCopy);
      setISCheckedAll(!isCheckedAll);
   };

   // Delete all handler
   const deleteAllHandler = () => {
      if (window.confirm("Delete all selected products?")) {
         const selectedProducts = products.filter((p) => p.checked === true);

         if (selectedProducts.length === 0) {
            return alert("No selected product.");
         }

         products.forEach((product) => {
            if (product.checked) {
               deleteProduct(product);
            }
         });

         // setProductCallback(!productCallback);

         // alert("Products deleted successfully.");
      }
   };

   return (
      <>
         {productLoading ? (
            <Spinner />
         ) : (
            <>
               {products.length === 0 ? (
                  <div className="error">
                     <h2>No product to display.</h2>
                  </div>
               ) : (
                  <>
                     {isAdmin && (
                        <div className="delete-all">
                           <div className="select">
                              <label htmlFor="all">Select All</label>
                              <input
                                 type="checkbox"
                                 id="all"
                                 checked={isCheckedAll}
                                 onChange={checkAllHandler}
                              />
                           </div>
                           <button onClick={deleteAllHandler}>
                              {loading ? "Deleting..." : "Delete All"}
                           </button>
                        </div>
                     )}
                     <div className="product-container">
                        {products.map((product) => (
                           <ProductItem key={product._id} product={product} />
                        ))}
                     </div>
                  </>
               )}
            </>
         )}
      </>
   );
};

export default Products;
