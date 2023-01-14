import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartAmount,
  selectCartItems,
  selectCartQuantity,
  SUBTOTAL,
  TOTAL_QUANTITY,
} from "../../redux/features/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartAmount = useSelector(selectCartAmount);
  const cartQuantity = useSelector(selectCartQuantity);
  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const removefromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  useEffect(() => {
    dispatch(SUBTOTAL());
    dispatch(TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <section>
      <h2>Shopping Cart</h2>
      <div className={`container ${styles.table}`}>
        {cartItems.length === 0 ? (
          <h1>Please Add Product to Cart</h1>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>products</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart) => {
                  const { id, name, price, imageUrl, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <p>{name}</p>
                        <img
                          style={{ width: "100px" }}
                          src={imageUrl}
                          alt={name}
                        />
                      </td>
                      <td>₹{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>{cartQuantity}</p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{`₹${(price * cartQuantity).toFixed(2)}`}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          onClick={() => removefromCart(cart)}
                          size={19}
                          color="red"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn -- btn-primary" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <br />
                <Card cardClass={styles.card}>
                  <p>{`Cart item(s): ${cartQuantity}`}</p>
                  <div className={styles.text}>
                    <h4>Subtotal</h4>
                    <h3>{`₹${cartAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button className="--btn --btn-primary --btn-block">
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
