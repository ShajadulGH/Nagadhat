import { createSlice } from "@reduxjs/toolkit";

const affiliateSlice = createSlice({
    name: "affiliate",
    initialState: {
        status: null,
    },
    reducers: {
        setAffiliateStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setAffiliateStatus } = affiliateSlice.actions;
export default affiliateSlice.reducer;
