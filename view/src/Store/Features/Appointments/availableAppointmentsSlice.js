import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}
const availableAppointmentSlice = createSlice({
    name: "availableAppointments",
    initialState,
    reducers: {
        setAvailableAppointments: (state, action) => {
            state.data = action.payload.availableAppointments;
        }
    }
});

export default availableAppointmentSlice.reducer;
export const { setAvailableAppointments } = availableAppointmentSlice.actions;
