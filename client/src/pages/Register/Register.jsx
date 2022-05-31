import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Register = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
   });

   const onChangeHandler = (e) => {
      const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });
   };

   const registerHandler = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.passwordConfirm) {
         alert("Passwords don't match.");
         return;
      }

      try {
         await axios.post("/user/register", { ...formData });

         localStorage.setItem("firstLogin", true);

         window.location.href = "/";
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   return (
      <div className="register">
         <h2>Register</h2>
         <form onSubmit={registerHandler}>
            <input
               type="text"
               name="name"
               placeholder="Name..."
               required
               value={formData.name}
               onChange={onChangeHandler}
            />
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
            <input
               type="password"
               name="passwordConfirm"
               placeholder="Confirm password..."
               required
               value={formData.passwordConfirm}
               onChange={onChangeHandler}
            />

            <div className="row">
               <button type="sumbit">Register</button>
               <span>
                  Have already an account? <Link to="/login">Login here.</Link>
               </span>
            </div>
         </form>
      </div>
   );
};

export default Register;
