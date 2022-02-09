import React, { useState } from "react";
import "./add-task-form.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/todos.redux";

const AddTaskForm = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: new Date().toISOString().substring(0, 10),
    priority: "Normal",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      new Date(task.dueDate) <
      new Date(new Date().toISOString().substring(0, 10))
    ) {
      alert("Please set the due date greater than or equal today");
    } else {
      dispatch(addTodo({ ...task, id: Math.random() }));
    }
  };

  return (
    <div className="container">
      <h1 className="title">New Task</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Add new task..."
          value={task.name}
          onChange={handleChange}
        />
        <div className="form-control">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="select-container">
          <div className="form-control">
            <label htmlFor="">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <button className="submit-btn">Add</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
