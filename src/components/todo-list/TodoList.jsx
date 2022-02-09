import React, { useState, useEffect, useMemo } from "react";
import TodoItem from "../todo-item/TodoItem";
import "./todo-list.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteMultiTodo } from "../../redux/todos.redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.todoList);
  const checkedList = useSelector((state) => state.todos.checkedList);

  const [searchText, setSearchText] = useState("");
  const [filterTodos, setFilterTodos] = useState(todoList);

  const sortedTodoList = useMemo(
    () =>
      filterTodos
        .slice()
        .sort(
          (item1, item2) => new Date(item1.dueDate) - new Date(item2.dueDate)
        ),
    [filterTodos]
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setFilterTodos(
      todoList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, todoList, dispatch]);

  return (
    <div className="container">
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Search ..."
        className="search-input"
        onChange={handleSearch}
        value={searchText}
      />
      <div className="list-item">
        {sortedTodoList.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </div>
      {checkedList.length > 0 && (
        <div className="bulk-action">
          <p>Bulk Action</p>
          <div className="action-btns">
            <button className="done-btn">Done</button>
            <button
              className="bulk-remove-btn"
              onClick={() => dispatch(deleteMultiTodo())}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
