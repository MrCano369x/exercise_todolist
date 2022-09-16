import Modal from "./Modal";

export default function NewTaskModal({ state, close, func }) {
  const createNewTask = (e) => {
    e.preventDefault();
    const task = Object.fromEntries(new FormData(e.target));
    task.status = "pending";
    //fetch api

    func(task);
    close();
  };

  return (
    <Modal state={state} close={close}>
      <div className="box">
        <h1 className="title">Create New Task</h1>

        <form onSubmit={createNewTask}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea" name="description"></textarea>
            </div>
          </div>

          <div className="buttons">
            <button className="button is-primary">Save</button>
            <button className="button is-light" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
