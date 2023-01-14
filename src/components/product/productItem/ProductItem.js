import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../../../redux/features/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

function ProductItem({ grid, product, id, name, price, desc, imageUrl }) {
  const shortenText = (text, number) => {
    if (text.length > number) {
      const shortendText = text.substring(0, number).concat("...");
      return shortendText;
    }
    return text;
  };

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`₹${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {/* remove it later  */}
        {!grid && <p className={styles.desc}>{shortenText(desc, 180)}</p>}

        <button
          onClick={() => addToCart(product)}
          className="--btn --btn-danger"
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
}

export default ProductItem;
