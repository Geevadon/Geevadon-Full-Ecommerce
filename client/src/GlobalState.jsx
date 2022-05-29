import { createContext, useState } from "react";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
   return (
      <GlobalState.Provider value={{ message: "Am the message" }}>
         {children}
      </GlobalState.Provider>
   );
};
