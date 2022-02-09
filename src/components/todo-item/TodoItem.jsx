import React, { useState, useEffect, memo } from "react";
import "./todo-item.css";
import {
  deleteTodo,
  updateTodo,
  addCheckedTodo,
  deleteCheckedTodo,
} from "../../redux/todos.redux";
import { useDispatch } from "react-redux";

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [task, setTask] = useState({
    name: item.name,
    description: item.description,
    dueDate: item.dueDate,
    priority: item.priority,
  });

  const handleChangeCheckBox = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleUpdateItem = (e, id) => {
    e.preventDefault();
    dispatch(updateTodo({ id, task }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    if (checked) {
      dispatch(addCheckedTodo({ id: item.id }));
    } else {
      dispatch(deleteCheckedTodo({ id: item.id }));
    }
  }, [checked, dispatch, item.id]);

  return (
    <div className="item">
      <div className="item-header">
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={handleChangeCheckBox}
        />
        <p className="name">{item.name}</p>
        <div className="action-btns">
          <button
            className="detail-btn"
            onClick={() => {
              setIsShowDetail(!isShowDetail);
            }}
          >
            Detail
          </button>
          <button
            className="remove-btn"
            onClick={() => handleDeleteItem({ id: item.id })}
          >
            Remove
          </button>
        </div>
      </div>
      {isShowDetail && (
        <div className="detail">
          <form className="form" onSubmit={(e) => handleUpdateItem(e, item.id)}>
            <input
              type="text"
              name="name"
              required
              placeholder="Add new task..."
              value={task.name}
              onChange={handleChange}
            />
            <div className="form-control">
              <label>Description</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <div className="select-container">
              <div className="form-control">
                <label>Due date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label>Priority</label>
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
            <button className="submit-btn">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default memo(TodoItem);
