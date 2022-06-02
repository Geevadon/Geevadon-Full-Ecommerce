import { useEffect, useState } from "react";
import axios from "axios";

const ProductAPI = () => {
   const [products, setProducts] = useState([]);
   const [productCallback, setProductCallback] = useState(false); // to refresh the product list when the state value changes

   const getProducts = async () => {
      const response = await axios.get("/api/products");

      setProducts(response.data.products);
   };

   useEffect(() => {
      getProducts();
   }, [productCallback]);

   return {
      products: [products, setProducts],
      productCallback: [productCallback, setProductCallback],
   };
};

export default ProductAPI;
