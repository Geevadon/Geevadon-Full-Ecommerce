import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const paymentController = {
   // Get all payments
   getPayments: async (req, res) => {
      try {
         const payments = await Payment.find({});

         return res.json(payments);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   // Create a payment
   createPayment: async (req, res) => {
      try {
         const user = await User.findById(req.user.id).select("name email");

         if (!user) {
            return res.status(400).json({ msg: "User doesn't exist." });
         }

         const { cart, paymentId, address } = req.body;
         const { _id, name, email } = user;

         const createdPayment = await Payment.create({
            userId: _id,
            name,
            email,
            paymentId,
            address,
            cart,
         });

         res.json(createdPayment);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
};

export default paymentController;
