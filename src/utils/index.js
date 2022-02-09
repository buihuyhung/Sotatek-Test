export const getTodoList = () => JSON.parse(localStorage.getItem("todoList"));

export const setTodoList = (value) => {
  localStorage.setItem("todoList", JSON.stringify(value));
};

export const removeTodoList = () => {
  localStorage.removeItem("todoList");
};
