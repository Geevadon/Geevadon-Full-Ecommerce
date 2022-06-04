import axios from "axios";
import { useEffect, useState } from "react";

const CategoryAPI = () => {
   const [categories, setCategories] = useState([]);
   const [callback, setCallback] = useState(false);

   const getCategories = async () => {
      try {
         const res = await axios.get("/api/category");

         setCategories(res.data);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   useEffect(() => {
      getCategories();
   }, [callback]);

   return {
      categories: [categories, setCategories],
      callback: [callback, setCallback],
   };
};

export default CategoryAPI;
