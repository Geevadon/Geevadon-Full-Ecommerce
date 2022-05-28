import User from "../models/userModel.js";

const authAdmin = async (req, res, next) => {
   try {
      // Get the user by id
      const user = await User.findOne({ _id: req.user.id });

      if (user.role === 0) {
         return res
            .status(400)
            .json({ msg: "Admin ressources access denied." });
      }

      next();
   } catch (err) {
      return res.status(500).json({ msg: err.message });
   }
};

export default authAdmin;
