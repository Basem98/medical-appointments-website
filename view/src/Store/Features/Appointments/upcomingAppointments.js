import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: null
}
const upcomingAppointments = createSlice({
    name: 'upcomingAppointments',
    initialState,
    reducers: {
        setUpcomingAppointments: (state, action) => {
            state.data = action.payload.upcomingAppointments
        }
    }
});

export default upcomingAppointments.reducer;
export const { setUpcomingAppointments } = upcomingAppointments.actions;