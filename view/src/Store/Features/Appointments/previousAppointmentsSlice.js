import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}
const previousAppointmentsSlice = createSlice({
    name: 'previousAppointment',
    initialState,
    reducers: {
        setPreviousAppointments: (state, action) => {
            state.data = action.payload.previousAppointements
        }
    }
})

export default previousAppointmentsSlice.reducer;
export const { setPreviousAppointments } = previousAppointmentsSlice.actions;