import { configureStore } from "@reduxjs/toolkit";
import userDetailsSliceReducer from "./Features/UserDetails/userDetailsSlice";
import doctorPatientsReducer from "./Features/DoctorPatients/doctorPatientsSlice";
import specialistsReducer from "./Features/Specialists/specialistsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSliceReducer,
    doctorPatients: doctorPatientsReducer,
    specialists: specialistsReducer,
  },
});
