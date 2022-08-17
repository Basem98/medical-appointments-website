import { configureStore } from "@reduxjs/toolkit";
import userDetailsSliceReducer from "./Features/UserDetails/userDetailsSlice";
import doctorPatientsReducer from "./Features/DoctorPatients/doctorPatientsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSliceReducer,
    doctorPatients: doctorPatientsReducer
  },
});
