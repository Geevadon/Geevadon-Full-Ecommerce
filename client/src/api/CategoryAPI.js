import axios from "axios";
import { useEffect, useState } from "react";

const CategoryAPI = () => {
   const [categories, setCategories] = useState([]);

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
   }, []);

   return {
      categories: [categories, setCategories],
   };
};

export default CategoryAPI;
