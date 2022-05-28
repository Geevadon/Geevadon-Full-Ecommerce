import cloudinary from "cloudinary";
import { cloudinaryConfig } from "../config/cloudinary.local.js"; // use ../config/cloudinary.js instead
import fs from "fs";

cloudinary.config({
   cloud_name: cloudinaryConfig.cloud_name,
   api_key: cloudinaryConfig.api_key,
   api_secret: cloudinaryConfig.api_secret,
});

const uploadController = {
   upload: async (req, res) => {
      try {
         // send back an error if there is no file to upload
         if (!req.files || Object.keys(req.files) === 0) {
            return res.status(400).json({ msg: "Please select a file." });
         }

         // file object
         const file = req.files.file;

         // file validation
         if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);

            return res
               .status(400)
               .json({ msg: "File size too large (1mb max)." });
         }

         if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
            removeTmp(file.tempFilePath);

            return res
               .status(400)
               .json({ msg: "File format is incorrect (only PNG and JPEG)" });
         }

         cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
               folder: "full_ecommerce",
            },
            async (err, result) => {
               if (err) throw err;

               removeTmp(file.tempFilePath);

               return res.json({
                  public_id: result.public_id,
                  url: result.secure_url,
               });
            }
         );
      } catch (err) {
         return res.status(500).json({ msg: err });
      }
   },

   delete: async (req, res) => {
      try {
         const { public_id } = req.body;

         if (!public_id) {
            return res
               .status(400)
               .json({ msg: "Please supply the image to delete." });
         }

         cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            return res.json({ msg: "Image deleted successfully." });
         });
      } catch (err) {
         return res.status(500).json({ msg: err.message });
      }
   },
};

// Helper for removing temp files
const removeTmp = (path) => {
   fs.unlink(path, (err) => {
      if (err) throw err;
   });
};

export default uploadController;
