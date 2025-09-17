// src/redux/slices/promotionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 프로모션 데이터 가져오기
export const fetchPromotions = createAsyncThunk(
    "promotions/fetchPromotions",
    async () => {
        const res = await axios.get("http://localhost:3001/프로모션");
        return res.data;
    }
);

const promotionSlice = createSlice({
    name: "promotions",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPromotions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPromotions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default promotionSlice.reducer;

