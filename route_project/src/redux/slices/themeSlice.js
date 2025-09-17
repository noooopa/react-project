// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

function initialMode() {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        // 시스템 선호도 기본값
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
}

const slice = createSlice({
    name: "theme",
    initialState: { mode: initialMode() },
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
            if (typeof window !== "undefined") localStorage.setItem("theme", state.mode);
        },
        setTheme(state, action) {
            const m = action.payload === "dark" ? "dark" : "light";
            state.mode = m;
            if (typeof window !== "undefined") localStorage.setItem("theme", m);
        },
    },
});

export const { toggleTheme, setTheme } = slice.actions;
export default slice.reducer;
