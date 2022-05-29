import Product from "../models/productModel.js";

const productController = {
   getProducts: async (req, res) => {
      try {
         const products = await Product.find({});

         return res.json(products);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
   createProduct: async (req, res) => {
      try {
         const {
            productId,
            title,
            price,
            description,
            content,
            images,
            category,
         } = req.body;

         if (!images) {
            return res
               .status(400)
               .json({ msg: "Please supply at least one image." });
         }

         const product = await Product.findOne({ productId });

         if (product) {
            return res
               .status(400)
               .json({ msg: "This product already exists." });
         }

         const createdProduct = await Product.create({
            productId,
            title: title.toLowerCase(),
            price,
            description,
            content,
            images,
            category,
         });

         return res.json(createdProduct);
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
   deleteProduct: async (req, res) => {
      try {
         await Product.findByIdAndDelete(req.params.id);

         return res.json({ msg: "Deleted successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
   updateProduct: async (req, res) => {
      try {
         const {
            title,
            price,
            description,
            content,
            images,
            category,
         } = req.body;

         if (!images) {
            return res
               .status(400)
               .json({ msg: "Please supply at least one image." });
         }

         await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
               title: title.toLowerCase(),
               price,
               description,
               content,
               images,
               category,
            }
         );

         return res.json({ msg: "Updated successfully." });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
};

export default productController;
