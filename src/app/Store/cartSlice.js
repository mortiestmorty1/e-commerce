import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        state.items[item.id] = { ...item, quantity: 1 };
      }
      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const item = state.items[itemId];
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        delete state.items[itemId];
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items[id];
      if (item) {
        state.totalQuantity += quantity - item.quantity;
        state.totalAmount += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;