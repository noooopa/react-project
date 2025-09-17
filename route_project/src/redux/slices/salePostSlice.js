import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST 요청용 thunk
export const createSale = createAsyncThunk("sales/createSale", async (saleData) => {
    const res = await axios.post("/api/sales", saleData);
    return res.data;
});

const salePostSlice = createSlice({
    name: "salePost",
    initialState: { loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSale.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSale.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createSale.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default salePostSlice.reducer;
