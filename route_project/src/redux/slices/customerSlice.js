// src/redux/slices/customerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 고객 데이터 가져오기
export const fetchCustomers = createAsyncThunk(
    "customers/fetchCustomers",
    async () => {
        const res = await axios.get("http://localhost:3001/고객");
        return res.data;
    }
);

const customerSlice = createSlice({
    name: "customers",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default customerSlice.reducer;
