import { useState } from "react";
import NewTaskModal from "../components/NewTaskModal";
import TaskModal from "../components/TaskModal";
import Pagination from "../components/Pagination";
import useModal from "../hooks/useModal";

const statuses = ["pending", "on progress", "done"];

const example_todolist = [];
for (let i = 0; i < 71; i++) {
  example_todolist.push({
    id: i,
    title: "Todo " + i,
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: statuses[Math.trunc(Math.random() * 3)],
  });
}

export default function App() {
  const [todoList, setTodoList] = useState(example_todolist);
  const [filter, setFilter] = useState("all");
  const [currentTask, setCurrentTask] = useState({});
  const [page, setPage] = useState(1);
  console.log(page);

  const filteredTodoList =
    filter == "all"
      ? todoList
      : todoList.filter((task) => task.status == filter);

  const paginatedTodoList = filteredTodoList.slice(
    (page - 1) * 15,
    (page - 1) * 15 + 15
  );

  const addNewTask = (newTask) => {
    setTodoList([...todoList, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTodoList(
      todoList.map((task) => (task.id == taskId ? updatedTask : task))
    );
  };

  const removeTask = (deletedTaskId) => {
    setTodoList(todoList.filter((task) => task.id != deletedTaskId));
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
        {paginatedTodoList.map((task) => (
          <div
            key={task.id}
            className="box"
            onClick={() => {
              setCurrentTask(task);
              openTaskModal();
            }}
          >
            <h1 className="title">{task.title}</h1>
            <h2 className="subtitle">{task.description}</h2>
            <h3 className="">{task.status}</h3>
          </div>
        ))}
      </div>

      <Pagination todoList={filteredTodoList} page={page} setPage={setPage} />
    </div>
  );
}
