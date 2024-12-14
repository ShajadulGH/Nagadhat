// store/slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profilePicture: null,
    },
    reducers: {
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        },
    },
});

export const { setProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
