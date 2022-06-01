import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
   // Register a user
   register: async (req, res) => {
      try {
         // Destruct the request body
         const { name, email, password } = req.body;

         // Get the user
         const user = await User.findOne({ email: email });

         // Check if the email is free to use
         if (user) {
            return res.status(400).json({ msg: "The email already exists." });
         }

         // Password validation
         if (password.length < 4) {
            return res
               .status(400)
               .json({ msg: "The password must have at least 4 characters." });
         }

         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);

         // Create the user
         const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
         });

         // Generate the jwt access token
         const accessToken = createAccessToken({ id: createdUser._id });
         const refreshToken = createRefreshToken({ id: createdUser._id });

         // Set the refresh token to the cookies
         res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/user/refresh_token",
         });

         return res.status(200).json({ accessToken });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Login user
   login: async (req, res) => {
      try {
         const { email, password } = req.body;

         const user = await User.findOne({ email });

         if (!user) {
            return res.status(400).json({ msg: "User doesn't exist." });
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
         }

         // If the login success, create an acccess and refresh token
         // Generate the jwt access token
         const accessToken = createAccessToken({ id: user._id });
         const refreshToken = createRefreshToken({ id: user._id });

         // Set the refresh token to the cookies
         res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/user/refresh_token",
         });

         return res.status(200).json({ accessToken });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Logout
   logout: async (req, res) => {
      try {
         res.clearCookie("refreshtoken", {
            path: "/user/refresh_token",
         });

         return res.json({ msg: "Logged out." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Get the refresh token from the cookies
   refreshToken: (req, res) => {
      const rf_token = req.cookies.refreshtoken;

      try {
         if (!rf_token) {
            return res.status(400).json({ msg: "Please login or register." });
         }

         // verify the refresh token
         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
               return res
                  .status(400)
                  .json({ msg: "Please login or register." });
            }

            const accessToken = createAccessToken({ id: user.id });
            return res.json({ accessToken });
         });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Get user infos
   me: async (req, res) => {
      try {
         const user = await User.findById(req.user.id).select("-password");

         if (!user) {
            return res.status(500).json({ msg: "User doesn't exist." });
         }

         return res.json(user);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Add to cart
   addToCart: async (req, res) => {
      try {
         const user = await User.findById(req.user.id);

         if (!user) {
            return res.status(400).json({ msg: "User doesn't exist." });
         }

         await User.findOneAndUpdate(
            { _id: req.user.id },
            {
               cart: req.body.cart,
            }
         );

         return res.json({ msg: "Added to cart successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
};

const createAccessToken = (user) => {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export default userController;
