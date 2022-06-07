import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const Filter = () => {
   const context = useContext(GlobalState);
   const [categories] = context.CategoryAPI.categories;
   const [category, setCategory] = context.ProductAPI.category;
   const [sort, setSort] = context.ProductAPI.sort;
   const [search, setSearch] = context.ProductAPI.search;
   const [keyword, setKeyword] = useState("");

   const categoryHandler = (e) => {
      setCategory(e.target.value);
      setSearch("");
   };

   const sortHandler = (e) => {
      setSort(e.target.value);
      setSearch("");
   };

   return (
      <div className="container">
         <div className="left">
            <div className="filter">
               <span>Filter: </span>
               <select value={category} onChange={categoryHandler}>
                  <option value="">All categories</option>
                  {categories.map((c) => (
                     <option value={`category=${c._id}`} key={c._id}>
                        {c.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="sort">
               <span>Sort By: </span>
               <select value={sort} onChange={sortHandler}>
                  <option value="">Newest</option>
                  <option value="sort=oldest">Oldest</option>
                  <option value="sort=-sold">Best sales</option>
                  <option value="sort=-price">Price: High - Low</option>
                  <option value="sort=price">Price: Low - High</option>
               </select>
            </div>
         </div>
         <div className="search">
            <input
               type="text"
               placeholder="Search..."
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={() => setSearch(keyword.toLocaleLowerCase())}>
               Search
            </button>
         </div>
      </div>
   );
};

export default Filter;
