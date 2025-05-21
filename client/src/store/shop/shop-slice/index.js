
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    products: [],
    isLoading: false
}


export const fetchFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async ()=>{
        
    const result = await axios.get('http://localhost:5000/api/shop/products/get-products');

        return result?.data;
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        })
        builder.addCase(fetchFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.products = [];
        })
    }
})

export default shoppingProductSlice.reducer;