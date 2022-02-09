import "./App.css";
import AddTaskForm from "./components/add-task-form/AddTaskForm";
import TodoList from "./components/todo-list/TodoList";

function App() {
  return (
    <div className="App">
      <div className="left-side">
        <AddTaskForm />
      </div>
      <div className="right-side">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
