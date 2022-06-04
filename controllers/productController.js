import Product from "../models/productModel.js";

class APIFeatures {
   constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
   }

   filtering() {
      const queryObj = { ...this.queryString }; //this.queryString = req.query

      const excludedProperties = ["page", "sort", "limit"];

      excludedProperties.forEach((property) => delete queryObj[property]); // the "delete" operator allows us to delete a property from an object

      let queryObjStringified = JSON.stringify(queryObj);
      queryObjStringified = queryObjStringified.replace(
         /\b(gte|gt|lt|lte|regex)\b/g,
         (match) => "$" + match
      );

      /**
       * MongoBD stuff
       * gte = greater than or equal
       * lte = less than or equal
       * gt = greater than
       * lt = less than
       */

      this.query.find(JSON.parse(queryObjStringified));

      return this;
   }

   sorting() {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.split(",").join(" ");

         this.query = this.query.sort(sortBy);

         console.log("@@@@ ==> SORT", sortBy);
      } else {
         this.query = this.query.sort("-createdAt");
      }

      return this;
   }

   paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);

      return this;
   }
}

const productController = {
   getProducts: async (req, res) => {
      try {
         const features = new APIFeatures(Product.find({}), req.query)
            .filtering()
            .sorting()
            .paginating();

         const products = await features.query;

         return res.json({
            status: "success",
            result: products.length,
            products,
         });
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

         // if (!images) {
         //    return res
         //       .status(400)
         //       .json({ msg: "Please supply at least one image." });
         // }

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
         const { title, price, description, content, images, category } =
            req.body;

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
