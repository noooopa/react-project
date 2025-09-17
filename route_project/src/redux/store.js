// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// 기존 slices
import sales from "./slices/salesSlice";
import products from "./slices/productSlice";
import customers from "./slices/customerSlice";
import promotions from "./slices/promotionSlice";
import channels from "./slices/channelSlice";
import users from "./slices/userSlice";
import regions from "./slices/regionSlice";
import categories from "./slices/categorySlice";
import productCategories from "./slices/productCategorySlice";
import dates from "./slices/dateSlice";
import salePost from "./slices/salePostSlice";

// 신규: 테마
import theme from "./slices/themeSlice";

const store = configureStore({
    reducer: {
        sales,
        products,
        customers,
        promotions,
        channels,
        users,
        regions,
        categories,
        productCategories,
        dates,
        theme,
        salePost,
    },
});

export default store;
