import { useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const Products = () => {
   const context = useContext(GlobalState);

   const [products] = context.ProductAPI.products;

   return (
      <div className="product-container">
         {products.map((product) => (
            <ProductItem key={product._id} product={product} />
         ))}
      </div>
   );
};

export default Products;
