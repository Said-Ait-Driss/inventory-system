import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredSuppliers: [],
  filteredCategories: [],
  filteredClients: [],
  filteredCommands: []
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
    FILTER_CLIENTS(state,action){
      const { clients, search } = action.payload;
      const tempClients = clients?.filter((client) =>
        client.nom?.toLowerCase()?.includes(search?.toLowerCase()) ||
        client.prenom?.toLowerCase()?.includes(search?.toLowerCase()) ||
        client.email?.toLowerCase()?.includes(search?.toLowerCase())
      );

      state.filteredClients = tempClients;
    },
    FILTER_COMMANDS(state,action){
      const { commands, search } = action.payload;
      const tempCommands = commands?.filter((command) =>
        command.client?.toLowerCase()?.includes(search?.toLowerCase())
      );

      state.filteredCommands = tempCommands;
    }
  },
});

export const { FILTER_PRODUCTS, FILTER_SUPPLIERS, FILTER_CATEGORIES, FILTER_CLIENTS, FILTER_COMMANDS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
export const selectFilteredSuppliers = (state) =>
  state.filter.filteredSuppliers;
export const selectFilteredCategories = (state) =>
  state.filter.filteredCategories;

export const selectFilteredClients = (state) =>
  state.filter.filteredClients;


export const selectFilteredCommands = (state) =>
  state.filter.filteredCommands;

export default filterSlice.reducer;
