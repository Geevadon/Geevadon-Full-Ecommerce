import { useEffect, useState } from "react";
import axios from "axios";

const ProductAPI = () => {
   const [products, setProducts] = useState([]);

   const getProducts = async () => {
      const response = await axios.get("/api/products");

      setProducts(response.data.products);
   };

   useEffect(() => {
      getProducts();
   }, []);

   return {
      products: [products, setProducts],
   };
};

export default ProductAPI;
