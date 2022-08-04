import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: "",
};

export const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.loggedIn = true;
      state.email = action.payload.email;
    },
    removeUserDetails: (state) => {
      state.loggedIn = false;
      state.email = "";
    },
  },
});

export const { setUserDetails, removeUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
