import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: "",
  role: "",
  data: null
};

export const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.data = action.payload.data;
    },
    removeUserDetails: (state) => {
      state.loggedIn = false;
      state.email = "";
      state.role = "";
      state.data = "";
    },
  },
});

export const { setUserDetails, removeUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
