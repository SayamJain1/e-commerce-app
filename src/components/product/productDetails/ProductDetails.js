import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase-config";
import spinner from "../../../assets/spinner.gif";
import { ADD_TO_CART, TOTAL_QUANTITY } from "../../../redux/features/cartSlice";
import { useDispatch } from "react-redux";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // getting a single document
  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setProduct(obj);
      } else {
        toast.error("Product not found.");
      }
    };
    return () => getProduct();
  }, []);

  const addToCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
    dispatch(TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={styles.heading}>
        <h2>Product Details</h2>
        <div>
          <Link to="/">
            <button className="--btn">&larr; Back</button>
          </Link>
        </div>
      </div>
      <div className={`container ${styles.product}`}>
        {product === null ? (
          <img src={spinner} style={{ height: "25px" }} alt="" />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt="" />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`₹${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                {/* <div className={styles.count}>
                  <button className="--btn" >
                    -
                  </button>
                  <b>1</b>
                  <button className="--btn">
                    +
                  </button>
                </div> */}
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
