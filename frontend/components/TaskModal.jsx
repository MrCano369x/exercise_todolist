import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { put, remove } from "../lib/fetch";

function EditingMode({ task, editTask, setMode }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = Object.fromEntries(new FormData(e.target));
    editTask(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            defaultValue={task.title}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            name="description"
            defaultValue={task.description}
            required
          ></textarea>
        </div>
      </div>

      <div className="field">
        <label className="label">Status</label>
        <div className="control">
          <div className="select">
            <select defaultValue={task.status} name="status">
              <option value="pending">Pending</option>
              <option value="on progress">On progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>

      <div className="buttons pt-3 is-flex is-justify-content-center">
        <button className="button is-primary">Save</button>
        <button
          className="button is-light"
          type="button"
          onClick={() => setMode("normal")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeletingMode({ task, deleteTask, setMode }) {
  return (
    <>
      <h1 className="title">{task.title}</h1>
      <h2 className="subtitle">
        Are you sure you wanna delete this task permanently?
      </h2>

      <div className="buttons pt-3 is-flex is-justify-content-center">
        <button className="button is-danger" onClick={deleteTask}>
          Confirm
        </button>
        <button className="button is-light" onClick={() => setMode("normal")}>
          Cancel
        </button>
      </div>
    </>
  );
}

function NormalMode({ task, setMode }) {
  return (
    <>
      <label className="label">Title</label>
      <h1 className="title">{task.title}</h1>

      <label className="label">Description</label>
      <h2 className="subtitle">{task.description}</h2>

      {task.status != "done" && (
        <>
          <label className="label">Status</label>

          <div className="select">
            <select defaultValue={task.status}>
              <option value="pending">Pending</option>
              <option value="on progress">On progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="buttons pt-3 is-flex is-justify-content-center">
            <button
              className="button is-info"
              onClick={() => setMode("editing")}
            >
              Edit
            </button>
            <button
              className="button is-danger"
              onClick={() => setMode("deleting")}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default function TaskModal({
  state,
  close,
  task,
  updateTask,
  removeTask,
}) {
  const [mode, setMode] = useState("normal");

  const editTask = async (updatedTask) => {
    const res = await put(
      "http://localhost:3000/tasks/" + task._id,
      updatedTask
    );
    if (!res.success) return alert(res.msg);

    updateTask(task._id, res.task);
    close();
  };

  const deleteTask = async () => {
    const res = await remove("http://localhost:3000/tasks/" + task._id);
    if (!res.success) return alert(res.msg);

    removeTask(task._id);
    close();
  };

  useEffect(() => setMode("normal"), [state]);

  return (
    <Modal state={state} close={close}>
      <div className="box">
        {mode == "editing" ? (
          <EditingMode task={task} editTask={editTask} setMode={setMode} />
        ) : mode == "deleting" ? (
          <DeletingMode task={task} deleteTask={deleteTask} setMode={setMode} />
        ) : (
          <NormalMode task={task} setMode={setMode} />
        )}
      </div>
    </Modal>
  );
}
