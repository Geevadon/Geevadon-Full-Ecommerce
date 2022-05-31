import { useContext } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ProductItem from "../../components/ProductItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const Products = () => {
   const context = useContext(GlobalState);

   const [products] = context.ProductAPI.products;
   const [isAdmin] = context.UserAPI.isAdmin;

   return (
      <>
         {products.length === 0 ? (
            <Spinner />
         ) : (
            <div className="product-container">
               {products.map((product) => (
                  <ProductItem
                     key={product._id}
                     product={product}
                     isAdmin={isAdmin}
                  />
               ))}
            </div>
         )}
      </>
   );
};

export default Products;
