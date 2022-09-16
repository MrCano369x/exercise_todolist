import { useState } from "react";
import NewTaskModal from "../components/NewTaskModal";
import Pagination from "../components/Pagination";
import useModal from "../hooks/useModal";

const example_todolist = [
  {
    id: "1",
    title: "todo1",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    id: "2",
    title: "todo2",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "done",
  },
  {
    id: "3",
    title: "todo3",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "on progress",
  },
  {
    id: "4",
    title: "todo4",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "on progress",
  },
  {
    id: "5",
    title: "todo5",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    id: "6",
    title: "todo6",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "done",
  },
];

export default function App() {
  const [todoList, setTodoList] = useState(example_todolist);
  const [filter, setFilter] = useState("all");

  const filteredTodoList =
    filter == "all"
      ? todoList
      : todoList.filter((task) => task.status == filter);

  const addNewTask = (task) => {
    setTodoList([...todoList, task]);
  };

  const [newTaskModalState, openNewTaskModal, closeNewTaskModal] = useModal();

  return (
    <div className="container p-3">
      <NewTaskModal
        state={newTaskModalState}
        close={closeNewTaskModal}
        func={addNewTask}
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
          <div key={task.id} className="box">
            <h1 className="title">{task.title}</h1>
            <h2 className="subtitle">{task.description}</h2>
            <h3 className="">{task.status}</h3>
          </div>
        ))}
      </div>

      <Pagination />
    </div>
  );
}
