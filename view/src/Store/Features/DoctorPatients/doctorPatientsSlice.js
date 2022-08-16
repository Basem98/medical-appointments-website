import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: null
};

export const doctorPatientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setDoctorPatients: (state, action) => {
      state.patients = action.payload.patients;
    },
    removeUserDetails: (state) => {
      state.patients = null;
    },
  },
});

export const { setDoctorPatients, removeUserDetails } = doctorPatientsSlice.actions;
export default doctorPatientsSlice.reducer;
