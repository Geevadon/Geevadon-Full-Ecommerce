import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const onChangeHandler = (e) => {
      const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });
   };

   const loginHandler = async (e) => {
      e.preventDefault();

      try {
         await axios.post("/user/login", { ...formData });

         localStorage.setItem("firstLogin", true);

         window.location.href = "/";
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   return (
      <div className="login">
         <h2>Login</h2>
         <form onSubmit={loginHandler}>
            <input
               type="email"
               name="email"
               placeholder="Email..."
               required
               value={formData.email}
               onChange={onChangeHandler}
            />
            <input
               type="password"
               name="password"
               placeholder="Password..."
               required
               value={formData.password}
               onChange={onChangeHandler}
            />

            <div className="row">
               <button type="sumbit">Login</button>
               <span>
                  No account yet? <Link to="/register">Register here.</Link>
               </span>
            </div>
         </form>
      </div>
   );
};

export default Login;
