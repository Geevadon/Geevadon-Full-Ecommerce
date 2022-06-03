import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const Categories = () => {
   const context = useContext(GlobalState);
   const [categories] = context.CategoryAPI.categories;
   const [category, setCategory] = useState("");

   console.log("@@@@ ===> context cat", categories);

   return (
      <div className="categories">
         <div className="col1">
            <form>
               <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               />

               <button type="submit">Save</button>
            </form>
         </div>
         <div className="col2">
            {categories.map((category) => (
               <div className="category-box" key={category._id}>
                  <span>{category.name}</span>
                  <div className="actions">
                     <button className="btn-edit">Edit</button>
                     <button className="btn-delete">Delete</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Categories;
