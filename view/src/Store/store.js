import { configureStore } from "@reduxjs/toolkit";
import userDetailsSliceReducer from "./Features/UserDetails/userDetailsSlice";
import doctorPatientsReducer from "./Features/DoctorPatients/doctorPatientsSlice";
import specialistsReducer from "./Features/Specialists/specialistsSlice";
import availableAppointmentsReducer from "./Features/Appointments/availableAppointmentsSlice";
import upcomingAppointmentsReducer from "./Features/Appointments/upcomingAppointmentsSlice";
import previousAppointmentsReducer from "./Features/Appointments/previousAppointmentsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSliceReducer,
    doctorPatients: doctorPatientsReducer,
    specialists: specialistsReducer,
    availableAppointments: availableAppointmentsReducer,
    upcomingAppointments: upcomingAppointmentsReducer,
    previousAppointments: previousAppointmentsReducer
  },
});
