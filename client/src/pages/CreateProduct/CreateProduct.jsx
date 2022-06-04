import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalState } from "../../GlobalState";
import imgBg from "./img/image.png";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { getPublicId } from "../../utils";

const initialProductState = {
   productId: "",
   title: "",
   price: "",
   description: "",
   content: "",
   category: "",
   _id: "",
};

const CreateProduct = () => {
   const context = useContext(GlobalState);
   const [product, setProduct] = useState(initialProductState);
   const [categories] = context.CategoryAPI.categories;
   const [products] = context.ProductAPI.products;
   const [productCallback, setProductCallback] =
      context.ProductAPI.productCallback;
   const [isAdmin] = context.UserAPI.isAdmin;
   const [token] = context.token;
   const [loading, setLoading] = useState(false);
   const [uri, setUri] = useState("");
   const [formData_, setFormData_] = useState("");
   const [onEdit, setOnEdit] = useState(false);

   const navigate = useNavigate();
   const params = useParams();

   const inputImgRef = useRef();

   const backgroundImage = uri ? uri : imgBg;
   const submitText = onEdit ? "Edit Now" : "Create Now";

   // image handler
   const imageHandler = (e) => {
      e.preventDefault();

      try {
         if (!isAdmin) return alert("You are not an admin.");

         const file = e.target.files[0];

         if (!file) return alert("Please select a file.");

         if (file.size > 1024 * 1024 * 2) return alert("File size too large.");

         if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type))
            return alert("Invalid file type.");

         setUri(URL.createObjectURL(file));

         let formData = new FormData();
         formData.append("file", file);
         setFormData_(formData);
      } catch (err) {
         alert(err.response.data.msg);
      }
   };

   // onchange handler for all the fields
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
   };

   // submit handler
   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         if (!isAdmin) return alert("You are not an admin.");

         setLoading(true);

         if (onEdit) {
            if (formData_) {
               // Delete the old product image
               await axios.post(
                  "/api/delete-img",
                  { publicId: product.images.publicId },
                  {
                     headers: {
                        Authorization: token,
                     },
                  }
               );

               // Upload the image
               const uploadRes = await axios.post("/api/upload", formData_, {
                  headers: {
                     "content-type": "multipart/form-data",
                     Authorization: token,
                  },
               });

               // Update the product for adding the image
               await axios.put(
                  `/api/products/${product._id}`,
                  {
                     ...product,
                     images: {
                        url: uploadRes.data.url,
                        publicId: uploadRes.data.public_id,
                     },
                  },
                  {
                     headers: {
                        Authorization: token,
                     },
                  }
               );
            } else {
               // Update the product for adding the image
               await axios.put(
                  `/api/products/${product._id}`,
                  {
                     ...product,
                     images: {
                        url: product.images.url,
                        publicId: product.images.publicId,
                     },
                  },
                  {
                     headers: {
                        Authorization: token,
                     },
                  }
               );
            }

            setProductCallback(!productCallback);
            alert("Product updated successfully.");
            navigate(`/edit-product/${product._id}`);
         } else {
            if (!formData_) {
               setLoading(false);
               return alert("Please select an image.");
            }
            // Create the product
            const productRes = await axios.post(
               "/api/products",
               { ...product },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            // Upload the image
            const uploadRes = await axios.post("/api/upload", formData_, {
               headers: {
                  "content-type": "multipart/form-data",
                  Authorization: token,
               },
            });

            // Update the product for adding the image
            await axios.put(
               `/api/products/${productRes.data._id}`,
               {
                  ...product,
                  images: {
                     url: uploadRes.data.url,
                     publicId: uploadRes.data.public_id,
                  },
               },
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );

            setProductCallback(!productCallback);
            setProduct(initialProductState);
            setUri("");

            alert("Product created successfully.");
            navigate("/");
         }

         setLoading(false);
      } catch (err) {
         setLoading(false);
         alert(err.response.data.msg);
      }
   };

   // useEffect
   useEffect(() => {
      if (params.id) {
         setOnEdit(true);

         products.forEach((product) => {
            if (product._id === params.id) {
               setProduct(product);
               setUri(product.images.url);
            }
         });
      } else {
         setOnEdit(false);
         setProduct(initialProductState);
         setUri("");
      }
   }, [params.id]);

   return (
      <div className="main-wrapper">
         <div className="create-product">
            <form onSubmit={submitHandler}>
               <div
                  className="upload"
                  style={{
                     backgroundImage: `url(${backgroundImage})`,
                  }}
                  onClick={() => inputImgRef.current.click()}
               >
                  <input
                     type="file"
                     name="file"
                     id="file"
                     ref={inputImgRef}
                     onChange={imageHandler}
                  />
                  {/* <span>x</span> */}
               </div>

               <div className="fields">
                  <input
                     type="text"
                     className="field"
                     name="productId"
                     placeholder="ID..."
                     required
                     value={product.productId}
                     onChange={onChangeHandler}
                     disabled={onEdit}
                  />
                  <input
                     type="text"
                     className="field"
                     name="title"
                     placeholder="Title..."
                     required
                     value={product.title}
                     onChange={onChangeHandler}
                  />
                  <input
                     type="number"
                     className="field"
                     name="price"
                     placeholder="Price..."
                     required
                     value={product.price}
                     onChange={onChangeHandler}
                  />

                  <textarea
                     name="description"
                     className="field"
                     rows="2"
                     placeholder="Description..."
                     required
                     value={product.description}
                     onChange={onChangeHandler}
                  ></textarea>

                  <textarea
                     name="content"
                     className="field"
                     rows="2"
                     placeholder="Content..."
                     required
                     value={product.content}
                     onChange={onChangeHandler}
                  ></textarea>

                  <select
                     name="category"
                     className="field"
                     rows="3"
                     placeholder="Category..."
                     required
                     value={product.category}
                     onChange={onChangeHandler}
                  >
                     <option value="">Catégorie...</option>
                     {categories.map((c) => (
                        <option value={c._id} key={c._id}>
                           {c.name}
                        </option>
                     ))}
                  </select>
                  <button type="submit">
                     {loading ? "Loading..." : submitText}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CreateProduct;
