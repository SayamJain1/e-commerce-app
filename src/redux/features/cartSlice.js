import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartQuantity: 0,
  cartAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        //item already exist in cart
        //increase the cartQuantity property
        state.cartItems[productIndex].cartQuantity += 1;
      } else {
        //item doesn't exist in cart
        //add Item to cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("Product added to cart");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.success("Product Removed from cart");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
    SUBTOTAL(state, action) {
      const arr = [];
      state.cartItems.map((item) => {
        const cartItemAmount = item.price * item.cartQuantity;
        return arr.push(cartItemAmount);
      });
      const totalAmount = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartAmount = totalAmount;
    },
    TOTAL_QUANTITY(state, action) {
      const arr = [];
      state.cartItems.map((item) => {
        const quantity = item.cartQuantity;
        return arr.push(quantity);
      });
      const totalQuatity = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartQuantity = totalQuatity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SUBTOTAL,
  TOTAL_QUANTITY,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartQuantity;
export const selectCartAmount = (state) => state.cart.cartAmount;

export default cartSlice.reducer;
