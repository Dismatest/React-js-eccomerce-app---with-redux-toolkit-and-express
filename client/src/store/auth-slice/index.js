import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const registerUser = createAsyncThunk('/auth/register', 
    async(formData) =>{
        const response = await axios.post('http://localhost:5000/api/auth/register',
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
)

export const loginUser = createAsyncThunk('/auth/login', 
    async(formData) =>{
        const response = await axios.post('http://localhost:5000/api/auth/login',
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
)

export const logOutUser = createAsyncThunk('/auth/logout', 
    async() =>{
        const response = await axios.post('http://localhost:5000/api/auth/logout',
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
)


export const checkAuthUser = createAsyncThunk('/auth/checkauth', 
    async() =>{
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',
            {
                //withCredentials is used  to send cookies to the server
                withCredentials: true,
                //headers is used to send custom headers to the server each time we make a request we do not get data from cache but server
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
                },
                // Expires: 0,
            }
        );
        return response.data;
    }
)



const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser: (state, action) => {

        }
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        }).addCase(registerUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        }).addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            // console.log(action)
            state.isAuthenticated = !action.payload.success ? false : true;
            state.isLoading = false;
            //storing the user data in the state after logging in
            state.user = !action.payload.success ? null : action.payload.user;
        }).addCase(loginUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        }).addCase(checkAuthUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(checkAuthUser.fulfilled, (state, action) => {
            state.isAuthenticated = !action.payload.success ? false : true;
            state.isLoading = false;
            state.user = !action.payload.success ? null : action.payload.user;
        }).addCase(checkAuthUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        }).addCase(logOutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;