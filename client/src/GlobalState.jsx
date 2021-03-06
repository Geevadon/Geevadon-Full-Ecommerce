import axios from "axios";
import { createContext, useEffect, useState } from "react";
import CategoryAPI from "./api/CategoryAPI";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
   const [token, setToken] = useState("");

   const firstLogin = localStorage.getItem("firstLogin");

   const refreshToken = async () => {
      const response = await axios.get("/user/refresh_token");

      setToken(response.data.accessToken);

      setTimeout(() => {
         refreshToken();
      }, 10 * 60 * 1000); // 10min
   };

   useEffect(() => {
      if (firstLogin) {
         refreshToken();
      }
   }, []);

   const state = {
      token: [token, setToken],
      ProductAPI: ProductAPI(),
      UserAPI: UserAPI(token),
      CategoryAPI: CategoryAPI(),
   };

   return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
