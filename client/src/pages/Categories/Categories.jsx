import axios from "axios";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const Categories = () => {
   const context = useContext(GlobalState);
   const [token] = context.token;
   const [categories] = context.CategoryAPI.categories;
   const [callback, setCallback] = context.CategoryAPI.callback;
   const [categoryName, setCategoryName] = useState("");
   const [onEdit, setOnEdit] = useState(false);
   const [categoryId, setCategoryId] = useState("");

   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         if (onEdit) {
            const res = await axios.put(
               `/api/category/${categoryId}`,
               { name: categoryName },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            alert(res.data.msg);
         } else {
            const res = await axios.post(
               "/api/category",
               { name: categoryName },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            alert(res.data.msg);
         }

         setOnEdit(false);

         setCallback(!callback);

         setCategoryName("");
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   const deleteHandler = async (id) => {
      try {
         if (window.confirm("Delete this category?")) {
            const res = await axios.delete(`/api/category/${id}`, {
               headers: { Authorization: token },
            });

            setCallback(!callback);

            alert(res.data.msg);
         }
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   const editHandler = async (id, name) => {
      setCategoryName(name);
      setCategoryId(id);
      setOnEdit(true);
   };

   return (
      <div className="categories">
         <div className="col1">
            <form onSubmit={submitHandler}>
               <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
               />

               <button type="submit">{onEdit ? "Update" : "Save"}</button>
            </form>
         </div>
         <div className="col2">
            {categories.map((category) => (
               <div className="category-box" key={category._id}>
                  <span>{category.name}</span>
                  <div className="actions">
                     <button
                        className="btn-edit"
                        onClick={() => editHandler(category._id, category.name)}
                     >
                        Edit
                     </button>
                     <button
                        className="btn-delete"
                        onClick={() => deleteHandler(category._id)}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Categories;
