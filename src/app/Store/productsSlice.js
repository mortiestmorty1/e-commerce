import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [], 
  filteredProducts: [],
  category: '',
  searchQuery: '',
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    if (response.status === 200) {
      return response.data;  
    } else {
      throw new Error('Failed to fetch products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.filteredProducts = state.products.filter(product => 
        product.category.toLowerCase() === action.payload.toLowerCase()
      );
      // Apply search filter within the category
      if (state.searchQuery.trim() !== "") {
        state.filteredProducts = state.filteredProducts.filter(product =>
          product.title.toLowerCase().includes(state.searchQuery.toLowerCase().trim())
        );
      }
    },
    setSearchQuery: (state, action) => {
      const { query, category } = action.payload;
      state.searchQuery = query;

      if (query.trim() === "") {
        state.filteredProducts = category ? state.products.filter(product =>
          product.category.toLowerCase() === category.toLowerCase()
        ) : state.products;
      } else {
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase().trim()) &&
          (category ? product.category.toLowerCase() === category.toLowerCase() : true)
        );
      }
    },
    resetFilters: (state) => {
      state.filteredProducts = state.products;
      state.category = '';
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setCategory, setSearchQuery, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;