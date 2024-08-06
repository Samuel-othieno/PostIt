import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Featurtes/userSlice";
import groupSlice from "../Featurtes/groupSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    group: groupSlice,
  },
});

export default store;
