// src/redux/slices/channelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 채널 데이터 가져오기
export const fetchChannels = createAsyncThunk(
    "channels/fetchChannels",
    async () => {
        const res = await axios.get("http://localhost:3001/채널");
        return res.data;
    }
);

const channelSlice = createSlice({
    name: "channels",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default channelSlice.reducer;
