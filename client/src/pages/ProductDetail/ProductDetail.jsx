import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./style.css";

const ProductDetail = () => {
   const context = useContext(GlobalState);
   const params = useParams();
   const [products] = context.ProductAPI.products;
   const [productDetail, setProductDetail] = useState({});
   const addToCart = context.UserAPI.addToCart;

   useEffect(() => {
      if (params.id) {
         products.forEach((product) => {
            if (product._id === params.id) {
               setProductDetail(product);
            }
         });
      }
   }, [params.id, products]);

   if (Object.keys(productDetail).length === 0) return null;

   return (
      <>
         <div className="detail">
            <img src={productDetail.images.url} alt={productDetail.title} />
            <div className="box">
               <div className="row">
                  <h2>{productDetail.title}</h2>
                  <small>#ID: {productDetail.productId}</small>
               </div>

               <span>${productDetail.price}</span>
               <p>{productDetail.description}</p>
               <p>{productDetail.content}</p>
               <p>Sold: {productDetail.sold}</p>
               <Link
                  to="/cart"
                  className="btn-cart"
                  onClick={() => addToCart(productDetail)}
               >
                  Buy Now
               </Link>
            </div>
         </div>

         <div className="related">
            <h2>Related Products</h2>
            <div className="products">
               {products
                  .filter((product) => product._id !== productDetail._id)
                  .map((product) => {
                     return product.category === productDetail.category ? (
                        <ProductItem key={product._id} product={product} />
                     ) : null;
                  })
                  .slice(0, 6)}
            </div>
         </div>
      </>
   );
};

export default ProductDetail;
