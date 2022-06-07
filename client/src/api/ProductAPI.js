import { useEffect, useState } from "react";
import axios from "axios";

const ProductAPI = () => {
   const [products, setProducts] = useState([]);
   const [productCallback, setProductCallback] = useState(false); // to refresh the product list when the state value changes
   const [productLoading, setProductLoading] = useState(false);
   const [category, setCategory] = useState("");
   const [sort, setSort] = useState("");
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(1);
   const [result, setResult] = useState(0);

   const getProducts = async () => {
      setProductLoading(true);
      const res = await axios.get(
         `/api/products?limit=${
            page * 8
         }&${category}&${sort}&title[regex]=${search}`
      );

      //console.log("@@@@ ====>", res);

      setProducts(res.data.products);
      setResult(res.data.result);
      setProductLoading(false);
   };

   useEffect(() => {
      getProducts();
   }, [productCallback, category, sort, search, page]);

   return {
      products: [products, setProducts],
      productCallback: [productCallback, setProductCallback],
      productLoading: [productLoading, setProductLoading],
      category: [category, setCategory],
      sort: [sort, setSort],
      search: [search, setSearch],
      page: [page, setPage],
      result: [result, setResult],
   };
};

export default ProductAPI;
