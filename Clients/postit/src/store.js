import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
  },
});

export default store;
