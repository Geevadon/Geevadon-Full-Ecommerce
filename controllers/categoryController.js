import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const categoryController = {
   getCategories: async (req, res) => {
      try {
         const categories = await Category.find({});

         return res.json(categories);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   createCategory: async (req, res) => {
      try {
         const { name } = req.body;

         const category = await Category.findOne({ name });

         if (category) {
            return res
               .status(400)
               .json({ msg: "This category already exists." });
         }

         await Category.create({ name });

         return res.json({ msg: "Created successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   deleteCategory: async (req, res) => {
      try {
         const product = await Product.findOne({ category: req.params.id });

         if (product) {
            return res.status(400).json({
               msg: "Please delete all the products that belong to this category first.",
            });
         }

         await Category.findByIdAndDelete(req.params.id);

         return res.json({ msg: "Deleted successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },

   updateCategory: async (req, res) => {
      try {
         const { name } = req.body;

         await Category.findOneAndUpdate({ _id: req.params.id }, { name });

         return res.json({ msg: "Updated successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
};

export default categoryController;
