import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    specialists: []
};

export const specialistsSlice = createSlice({
    name: "specialists",
    initialState,
    reducers:{
        setSpecialists: (state,action) => {
            state.specialists= action.payload.specialists;
        },

        // removeSpecialsts: (state)=>{
        //     state.specialists = [];
        // }
    }
})

export const {setSpecialists} = specialistsSlice.actions;
export default specialistsSlice.reducer;