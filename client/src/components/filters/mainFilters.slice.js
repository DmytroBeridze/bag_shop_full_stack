import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainfilterType: "bags",
};

export const mainFilterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    mainfilterValue: (state, action) => {
      state.mainfilterType = action.payload;
    },
  },
});

const { actions, reducer } = mainFilterSlice;
export const { mainfilterValue } = actions;
export default reducer;
