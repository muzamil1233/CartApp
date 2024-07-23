import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  (builder) => {
    builder
      .addCase('addToCart', (state, action) => {
        const item = action.payload;
        const existingItem = state.cartItems.find((i) => i.id === item.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ ...item, quantity: 1 });
        }
      })
      .addCase('decrement', (state, action) => {
        const item = state.cartItems.find((i) => i.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      })
      .addCase('deleteFromCart', (state, action) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      })
      .addCase('calculatePrice', (state) => {
        state.subTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.shipping = state.subTotal > 1000 ? 0 : 200;
        state.tax = +(state.subTotal * 0.18).toFixed(2);
        state.total = state.subTotal + state.tax + state.shipping;
      });
  }
);
