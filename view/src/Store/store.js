import { configureStore } from "@reduxjs/toolkit";
import userDetailsSliceReducer from "./Features/UserDetails/userDetailsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSliceReducer,
  },
});
