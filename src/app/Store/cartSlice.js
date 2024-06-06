import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState() || {
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
      saveState(state); // Save state to local storage
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const item = state.items[itemId];
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        delete state.items[itemId];
        saveState(state); // Save state to local storage
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items[id];
      if (item) {
        state.totalQuantity += quantity - item.quantity;
        state.totalAmount += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
        saveState(state); // Save state to local storage
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;