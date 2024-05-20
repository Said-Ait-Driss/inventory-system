import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import supplierReducer from "../redux/features/supplier/supplierSlice";
import filterReducer from "./features/filter/filterSlice";
import categoryReducer from "./features/category/categorySlice";
import clientReducer from "./features/client/clientSlice";
import commandReducer from "./features/command/commandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    supplier: supplierReducer,
    filter: filterReducer,
    category: categoryReducer,
    client: clientReducer,
    command: commandReducer,
  },
});
