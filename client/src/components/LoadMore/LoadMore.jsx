import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./style.css";

const LoadMore = () => {
   const context = useContext(GlobalState);
   const [page, setPage] = context.ProductAPI.page;
   const [result] = context.ProductAPI.result;

   return (
      <div className="load-more">
         {result < page * 8 ? (
            ""
         ) : (
            <button onClick={() => setPage(page + 1)}>Load More</button>
         )}
      </div>
   );
};

export default LoadMore;
