import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos.redux";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
