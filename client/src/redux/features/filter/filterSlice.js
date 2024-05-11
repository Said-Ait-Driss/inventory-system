import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredSuppliers: [],
  filteredCategories: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          product.category?.toLowerCase()?.includes(search?.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    FILTER_SUPPLIERS(state, action) {
      const { suppliers, search } = action.payload;
      const tempSuppliers = suppliers.filter(
        (supplier) =>
          supplier.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          supplier.email?.toLowerCase()?.includes(search?.toLowerCase())
      );

      state.filteredSuppliers = tempSuppliers;
    },
    FILTER_CATEGORIES(state, action) {
      const { categories, search } = action.payload;
      const tempCategories = categories.filter((category) =>
        category.name?.toLowerCase()?.includes(search?.toLowerCase())
      );

      state.filteredCategories = tempCategories;
    },
  },
});

export const { FILTER_PRODUCTS, FILTER_SUPPLIERS, FILTER_CATEGORIES } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
export const selectFilteredSuppliers = (state) =>
  state.filter.filteredSuppliers;
export const selectFilteredCategories = (state) =>
  state.filter.filteredCategories;

export default filterSlice.reducer;
