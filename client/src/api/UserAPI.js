import axios from "axios";
import { useEffect, useState } from "react";

const UserAPI = (token) => {
   const [isLogged, setIsLogged] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   const getUser = async () => {
      try {
         const res = await axios.get("/user/me", {
            headers: {
               Authorization: token,
            },
         });

         // set isLogged to true
         setIsLogged(true);

         // set isAdmin to true if the role is 1.
         res.data.role === 1 && setIsAdmin(true);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   useEffect(() => {
      if (token) {
         getUser();
      }
   }, [token]);

   return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
   };
};

export default UserAPI;
