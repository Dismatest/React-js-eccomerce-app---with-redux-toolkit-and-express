import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: [],
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData)=>{
        
    const result = await axios.post('http://localhost:5000/api/admin/products/add-product', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async ()=>{
        
    const result = await axios.get('http://localhost:5000/api/admin/products/get-product');

        return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct', async ({id, formData})=>{
        
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(id);
    return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id)=>{
        
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`);

    return result?.data;
})

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.products = [];
        })
    }
})

export default AdminProductsSlice.reducer;