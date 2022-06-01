import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      paymentId: {
         type: String,
         required: true,
      },
      address: {
         type: Object,
         required: true,
         default: {},
      },
      cart: {
         type: Array,
         default: [],
      },
      status: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("Payment", paymentSchema);
