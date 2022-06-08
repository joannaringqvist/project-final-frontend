/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const events = createSlice({
  name: 'events',
  initialState: {
    title: '',
    startDate: '',
    endDate: '',
  },
  reducers: {
    SetEvent: (store, action) => {
      store.events = action.payload;
    },
    addEvent: (store, action) => {
      store.events.unshift(action.payload);
    },
  },
});
