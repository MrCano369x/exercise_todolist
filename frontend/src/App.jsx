import { useState } from "react";
import NewTaskModal from "../components/NewTaskModal";
import Pagination from "../components/Pagination";
import useModal from "../hooks/useModal";

const example_todolist = [
  {
    title: "todo1",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    title: "todo2",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    title: "todo3",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    title: "todo4",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    title: "todo5",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
  {
    title: "todo6",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "pending",
  },
];

export default function App() {
  const [todoList, setTodoList] = useState(example_todolist);

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

      <button className="button is-success" onClick={openNewTaskModal}>
        Create new task
      </button>

      <hr />

      <div className="select">
        <select>
          <option value="">Show all</option>
          <option value="">Pending</option>
          <option value="">On progress</option>
          <option value="">Done</option>
        </select>
      </div>

      <div className="py-3">
        {todoList.map((task) => (
          <div className="box">
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
