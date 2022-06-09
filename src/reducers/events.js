/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const eventTodos = createSlice({
  name: 'event',
  initialState: {
    events: [],
  },
  reducers: {
    setEvent: (store, action) => {
      store.events = action.payload;
    },
    addEvent: (store, action) => {
      store.events.unshift(action.payload);
    },
    deleteEvent: (store, action) => {
      const { id } = action.payload;
      console.log(action.payload);
      const event = store.events.find((ev) => ev.id === id);
      store.events.splice(store.events.indexOf(event), 1);
    },
    toggleTodo: (store, action) => {
      const toggledTodo = store.events.find(
        (event) => event._id === action.payload
      );
      toggledTodo.isCompleted = !toggledTodo.isCompleted;
    },
  },
});

export default eventTodos;
