import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
  },
});

export const { addGroup } = groupSlice.actions;
export default groupSlice.reducer;
