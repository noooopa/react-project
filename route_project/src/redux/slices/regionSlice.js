// src/redux/slices/regionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 지역 데이터 가져오기
export const fetchRegions = createAsyncThunk(
    "regions/fetchRegions",
    async () => {
        const res = await axios.get("http://localhost:3001/지역");
        return res.data;
    }
);

const regionSlice = createSlice({
    name: "regions",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRegions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRegions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default regionSlice.reducer;

