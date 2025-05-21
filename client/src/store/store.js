

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductsSlice from "./admin/product-slice";
import shoppingProductSlice from "./shop/shop-slice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        adminProducts: adminProductsSlice, //adminPtoducts the name that I will use in the useSelcetor hook
        shoppingProduct: shoppingProductSlice
    }
});

export default store;