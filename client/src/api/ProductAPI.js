import { useEffect, useState } from "react";
import axios from "axios";

const ProductAPI = () => {
   const [products, setProducts] = useState([]);
   const [productCallback, setProductCallback] = useState(false); // to refresh the product list when the state value changes
   const [productLoading, setProductLoading] = useState(false);

   const getProducts = async () => {
      setProductLoading (true);
      const response = await axios.get("/api/products");

      setProducts(response.data.products);
      setProductLoading(false);
   };

   useEffect(() => {
      getProducts();
   }, [productCallback]);

   return {
      products: [products, setProducts],
      productCallback: [productCallback, setProductCallback],
      productLoading: [productLoading, setProductLoading],
   };
};

export default ProductAPI;
