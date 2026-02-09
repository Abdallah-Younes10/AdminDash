import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
    name: "date",
    initialState: { value: 7 },
    reducers: {
        setDate: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
