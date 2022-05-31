import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
   const [token, setToken] = useState("");

   const refreshToken = async () => {
      const response = await axios.get("/user/refresh_token");

      setToken(response.data.accessToken);
   };

   useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin");

      if (firstLogin) {
         refreshToken();
      }
   }, []);

   const state = {
      token: [token, setToken],
      ProductAPI: ProductAPI(),
      UserAPI: UserAPI(token),
   };

   return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
