// src/redux/slices/dateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 날짜 데이터 가져오기
export const fetchDates = createAsyncThunk(
    "dates/fetchDates",
    async () => {
        const res = await axios.get("http://localhost:3001/날짜");
        return res.data;
    }
);

const dateSlice = createSlice({
    name: "dates",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDates.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dateSlice.reducer;
