import { createSlice } from "@reduxjs/toolkit";
import { getTodoList, removeTodoList, setTodoList } from "../utils";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todoList: getTodoList() ? getTodoList() : [],
    checkedList: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      removeTodoList();
      setTodoList(state.todoList);
    },

    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
      removeTodoList();
      setTodoList(state.todoList);
    },

    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.task };
        }
        return item;
      });
    },

    addCheckedTodo: (state, action) => {
      state.checkedList.push(action.payload.id);
    },

    deleteCheckedTodo: (state, action) => {
      state.checkedList = state.checkedList.filter(
        (id) => id !== action.payload.id
      );
    },

    deleteMultiTodo: (state) => {
      state.todoList = state.todoList.filter(
        (item) => !state.checkedList.includes(item.id)
      );
      state.checkedList = [];
      removeTodoList();
      setTodoList(state.todoList);
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  addCheckedTodo,
  deleteCheckedTodo,
  deleteMultiTodo,
} = todosSlice.actions;
export default todosSlice.reducer;
