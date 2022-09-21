import { useState } from "react";
import NewTaskModal from "../components/NewTaskModal";
import TaskModal from "../components/TaskModal";
import Pagination from "../components/Pagination";
import useModal from "../hooks/useModal";

const status_class = {
  pending: "is-warning",
  "on progress": "is-info",
  done: "is-success",
};

const truncateDesc = (text) => {
  return text.length > 120 ? text.substring(0, 120) + "..." : text;
};

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentTask, setCurrentTask] = useState({});

  const filteredTodoList =
    filter == "all"
      ? todoList
      : todoList.filter((task) => task.status == filter);

  const addNewTask = (newTask) => {
    setTodoList([...todoList, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTodoList(
      todoList.map((task) => (task._id == taskId ? updatedTask : task))
    );
  };

  const removeTask = (deletedTaskId) => {
    setTodoList(todoList.filter((task) => task._id != deletedTaskId));
  };

  const [TaskModalState, openTaskModal, closeTaskModal] = useModal();
  const [newTaskModalState, openNewTaskModal, closeNewTaskModal] = useModal();

  return (
    <div className="container p-3">
      <NewTaskModal
        state={newTaskModalState}
        close={closeNewTaskModal}
        func={addNewTask}
      />

      <TaskModal
        state={TaskModalState}
        close={closeTaskModal}
        task={currentTask}
        updateTask={updateTask}
        removeTask={removeTask}
      />

      <h1 className="title">TodoList</h1>

      <button className="button is-primary" onClick={openNewTaskModal}>
        Create new task
      </button>

      <hr />

      <div className="select" onChange={(e) => setFilter(e.target.value)}>
        <select>
          <option value="all">Show all</option>
          <option value="pending">Pending</option>
          <option value="on progress">On progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="py-3">
        {filteredTodoList.map((task) => (
          <div
            key={task._id}
            className="box"
            onClick={() => {
              setCurrentTask(task);
              openTaskModal();
            }}
          >
            <h1 className="title">{task.title}</h1>
            <h2 className="subtitle">{truncateDesc(task.description)}</h2>
            <h3 className={`tag ${status_class[task.status]}`}>
              {task.status}
            </h3>
          </div>
        ))}
      </div>

      <Pagination setTodoList={setTodoList} />
    </div>
  );
}
