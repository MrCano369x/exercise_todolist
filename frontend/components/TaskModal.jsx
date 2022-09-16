import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";

function EditingMode({ task, editTask, setMode }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = Object.fromEntries(new FormData(e.target));

    editTask(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="title"
            defaultValue={task.title}
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            name="description"
            defaultValue={task.description}
            required
          ></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Status</label>
        <div class="control">
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
      <label class="label">Title</label>
      <h1 className="title">{task.title}</h1>

      <label class="label">Description</label>
      <h2 className="subtitle">{task.description}</h2>

      {task.status != "done" && (
        <>
          <label class="label">Status</label>

          <div className="select">
            <select defaultValue={task.status} name="">
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
    //fetch api
    updateTask.id = task.id;
    updateTask(task.id, updatedTask);
    close();
  };

  const deleteTask = () => {
    //fetch api
    removeTask(task.id);
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
