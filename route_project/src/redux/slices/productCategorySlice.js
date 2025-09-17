// src/redux/slices/productCategorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 제품분류 데이터 가져오기
export const fetchProductCategories = createAsyncThunk(
    "productCategories/fetchProductCategories",
    async () => {
        const res = await axios.get("http://localhost:3001/제품분류");
        return res.data;
    }
);

const productCategorySlice = createSlice({
    name: "productCategories",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productCategorySlice.reducer;
