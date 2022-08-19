import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: null
}
const upcomingAppointmentsSlice = createSlice({
    name: 'upcomingAppointments',
    initialState,
    reducers: {
        setUpcomingAppointments: (state, action) => {
            state.data = action.payload.upcomingAppointments
        }
    }
});

export default upcomingAppointmentsSlice.reducer;
export const { setUpcomingAppointments } = upcomingAppointmentsSlice.actions;