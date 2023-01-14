import React, { useState } from "react";
import Card from "../card/Card";
import styles from "./AdminAddProduct.module.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../loader/Loader";

const caterories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

function AdminAddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [upProgress, setUpProgress] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    //   add image to storage
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //   showing progress bar
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUpProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setProduct({
        name: "",
        imageUrl: "",
        price: 0,
        category: "",
        brand: "",
        desc: "",
      });

      toast.success("Product uploaded successfully.");
      // navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <h1>Add New Product</h1>
      <div className={styles.product}>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
            <label>Product name:</label>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {upProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${upProgress}%` }}
                  >
                    {Math.round(upProgress)}%
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                placeholder="Product iamge"
                value={product.image}
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageUrl === "" ? null : (
                <input
                  type="text"
                  // required
                  name="imageUrl"
                  value={product.imageUrl}
                  disabled
                  placeholder="Image URL"
                />
              )}
            </Card>

            <label>Product price:</label>
            <input
              type="number"
              name="price"
              placeholder="Product price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category
              </option>
              {caterories.map((item) => {
                return (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <label>Product company:</label>
            <input
              type="text"
              name="brand"
              placeholder="Product brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product description:</label>
            <textarea
              required
              name="desc"
              value={product.desc}
              cols="30"
              rows="10"
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Sava Product
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AdminAddProduct;
