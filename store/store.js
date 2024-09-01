import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice';
import userSlice from './userSlice';

// https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
  },
});