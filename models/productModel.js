import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   title: {
      type: String,
      required: true,
      trim: true,
   },
   price: {
      type: Number,
      default: 0,
   },
   description: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   images: {
      type: Object,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   checked: {
      type: Boolean,
      default: false,
   },
   sold: {
      type: Number,
      default: 0,
   },
});

export default mongoose.model("Product", productSchema);
