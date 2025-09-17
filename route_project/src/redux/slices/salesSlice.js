import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSalePage = createAsyncThunk(
    "sales/fetchSalePage",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:3001/판매");
            console.log("판매 응답:", response.data);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalePage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSalePage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSalePage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default salesSlice.reducer;
